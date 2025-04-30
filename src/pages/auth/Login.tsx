import FormWrapper from "@/components/form/FormWrapper";
import InputField from "@/components/form/InputField";
import { loginValidationSchema, TLoginUserForm } from "./login.validation";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "./auth.utils";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  const handleSubmit = async (loginInfos: TLoginUserForm) => {
    setIsSubmitting(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        loginInfos,
        { withCredentials: true }
      );

      if (!data?.data) throw new Error("Invalid Response Format");
      const { user, tokens } = data.data;
      setAuthData({
        user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
      toast.success("Login Successful!", {
        duration: 3000,
        position: "top-right",
      });
      navigate(
        user?.role === "Admin"
          ? "/admin/dashboard"
          : user?.role === "Customer"
          ? "/users/dashboard"
          : "/"
      );
    } catch (error) {
      console.error("Login Failed", error);
      toast.error(getErrorMessage(error), {
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="p-4 md:p-20">
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-xl md:text-2xl font-bold mb-4">Login</h1>
        <FormWrapper
          schema={loginValidationSchema}
          defaultValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          submitButtonLabel={isSubmitting ? "Logging In..." : "Login"}
          submitButtonIsDisabled={isSubmitting}
        >
          {(form) => (
            <div className="grid grid-cols-1 gap-4">
              <InputField
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
              />

              {/* Password Field */}
              <InputField
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
          )}
        </FormWrapper>
        <div className="pt-4">
          <p className="text-xs text-blue-500">
            New Here?{" "}
            <Link to="/register">
              {" "}
              <span className="font-semibold">Register</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
