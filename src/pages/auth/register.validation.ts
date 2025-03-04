import { z } from "zod";
import { USER_GENDER } from "./auth.constants";

const imageSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "File size must be less than 5 MB",
  })
  .refine(
    (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
    { message: "Only JPEG, PNG, and JPG images are allowed" }
  );

const userNameSchema = z.object({
  firstName: z.string().min(1, "First Name is required").trim(),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last Name is required").trim(),
});

const registerUserSchema = z.object({
  name: userNameSchema,
  gender: z.enum([USER_GENDER.Male, USER_GENDER.Female, USER_GENDER.Others], {
    required_error: "Gender is required",
  }),
  profileImage: imageSchema.optional(),
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .min(18, "Age must be at least 18"),
  contactNo: z.string().min(1, "Contact Number is required").trim(),
  address: z.string().min(1, "Address is required").trim(),
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email is required")
    .trim(),
  password: z.string().min(6, "Password must be at least 6 characters long"),

  isDeleted: z.boolean().optional().default(false),
});

export type TRegisterUserForm = z.infer<typeof registerUserSchema>;
export { registerUserSchema };
