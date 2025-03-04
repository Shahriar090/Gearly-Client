import FormWrapper from "@/components/form/FormWrapper";
import { registerUserDefaultValues, USER_GENDER } from "./auth.constants";
import { registerUserSchema, TRegisterUserForm } from "./register.validation";
import InputField from "@/components/form/InputField";

const Register = () => {
  const handleRegister = (values: TRegisterUserForm) => {
    console.log("Registering user:", values);
    // Handle form submission logic, such as calling an API
  };

  return (
    <section className="p-4 md:p-20">
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-xl md:text-2xl font-bold mb-4">Register</h1>

        <FormWrapper
          schema={registerUserSchema}
          defaultValues={registerUserDefaultValues}
          onSubmit={handleRegister}
          submitButtonLabel="Register"
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                {/* Profile Image Field */}
                <InputField
                  control={form.control}
                  name="profileImage"
                  label="Profile Image"
                  type="file"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              </div>
            </div>
          )}
        </FormWrapper>
      </div>
    </section>
  );
};

export default Register;
