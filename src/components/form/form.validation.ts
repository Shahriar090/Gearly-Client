import { z } from "zod";

export const userFormSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
  email: z.string().email("Invalid email address"),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
