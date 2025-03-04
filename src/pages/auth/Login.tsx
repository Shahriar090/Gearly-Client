import {
  userFormSchema,
  UserFormValues,
} from "@/components/form/form.validation";
import FormWrapper from "@/components/form/FormWrapper";
import InputField from "@/components/form/InputField";

const Login = () => {
  const handleSubmit = (values: UserFormValues) => {
    console.log("Submitted values", values);
  };
  return (
    <div className="border w-full h-screen flex items-center justify-center">
      <FormWrapper
        schema={userFormSchema}
        defaultValues={{ username: "", email: "" }}
        onSubmit={handleSubmit}
        submitButtonLabel="Login"
      >
        {(form) => (
          <div className="w-full max-w-xl mx-auto">
            <InputField
              control={form.control}
              name="username"
              label="UserName"
              placeholder="Enter Your Name"
            />
            <InputField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter Your Email"
            />
          </div>
        )}
      </FormWrapper>
    </div>
  );
};

export default Login;
