import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type TLoginUserForm = z.infer<typeof loginValidationSchema>;
export { loginValidationSchema };
