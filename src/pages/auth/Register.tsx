import FormWrapper from "@/components/form/FormWrapper";
import { registerUserDefaultValues, USER_GENDER } from "./auth.constants";
import { registerUserSchema, TRegisterUserForm } from "./register.validation";
import InputField from "@/components/form/InputField";
import { Link } from "react-router";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handling registration logic
  const handleRegister = async (userData: TRegisterUserForm) => {
    try {
      setIsSubmitting(true);

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_LOCAL_URL}/users/create-user`,
        {
          user: userData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("User Registered Successfully", {
        duration: 3000,
        position: "top-right",
      });
      console.log("User Registered", response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("User Registration Failed", error);

      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during registration";
      toast.error(errorMessage, {
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
        <h1 className="text-xl md:text-2xl font-bold mb-4">Register</h1>

        <FormWrapper
          schema={registerUserSchema}
          defaultValues={registerUserDefaultValues}
          onSubmit={handleRegister}
          submitButtonLabel={isSubmitting ? "Registering..." : "Register"}
          submitButtonIsDisabled={isSubmitting}
        >
          {(form) => (
            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  control={form.control}
                  name="name.firstName"
                  label="First Name"
                  placeholder="Enter first name"
                />
                <InputField
                  control={form.control}
                  name="name.middleName"
                  label="Middle Name (Optional)"
                  placeholder="Enter middle name"
                  isVisible={true}
                />
                <InputField
                  control={form.control}
                  name="name.lastName"
                  label="Last Name"
                  placeholder="Enter last name"
                />

                {/* Email Field */}
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
                {/* Contact Number */}
                <InputField
                  control={form.control}
                  name="contactNo"
                  label="Contact Number"
                  placeholder="Enter contact number"
                />
                {/* Address Field */}
                <InputField
                  control={form.control}
                  name="address"
                  label="Address"
                  placeholder="Enter your address"
                />

                {/* Gender Field */}
                <InputField
                  control={form.control}
                  name="gender"
                  label="Gender"
                  type="select"
                  options={[
                    { label: "Male", value: USER_GENDER.Male },
                    { label: "Female", value: USER_GENDER.Female },
                    { label: "Others", value: USER_GENDER.Others },
                  ]}
                />
                {/* Age Field */}
                <InputField
                  control={form.control}
                  name="age"
                  label="Age"
                  type="number"
                  placeholder="Enter your age"
                />
              </div>
            </div>
          )}
        </FormWrapper>
        <div className="pt-4">
          <p className="text-xs text-blue-500">
            Already have an account?{" "}
            <Link to="/login">
              {" "}
              <span className="font-semibold">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
