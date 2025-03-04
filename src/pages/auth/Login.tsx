import {} from "@/components/form/form.validation";
import FormWrapper from "@/components/form/FormWrapper";
import InputField from "@/components/form/InputField";
import { loginValidationSchema, TLoginUserForm } from "./login.validation";

const Login = () => {
  const handleSubmit = (values: TLoginUserForm) => {
    console.log("Submitted values", values);
  };
  return (
    <section className="p-4 md:p-20">
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-xl md:text-2xl font-bold mb-4">Login</h1>
        <FormWrapper
          schema={loginValidationSchema}
          defaultValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          submitButtonLabel="Login"
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
      </div>
    </section>
  );
};

export default Login;
