import { TRegisterUserForm } from "./register.validation";

export const USER_GENDER = {
  Male: "Male",
  Female: "Female",
  Others: "Others",
} as const;

export const registerUserDefaultValues: TRegisterUserForm = {
  name: {
    firstName: "",
    middleName: "",
    lastName: "",
  },
  gender: USER_GENDER.Male,
  profileImage: undefined,
  age: 18,
  contactNo: "",
  address: "",
  email: "",
  password: "",
  isDeleted: false,
};
