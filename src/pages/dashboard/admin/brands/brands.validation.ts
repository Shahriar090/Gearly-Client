import { z } from "zod";

export const createBrandValidationSchema = z.object({
  brandName: z.string().min(1, "Brand name is required"),
  categoryName: z.string().min(1, "Category name is required"),
  description: z.string().min(1, "Description is required"),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "Image is required",
    })
    .optional(),
});

export type TAddBrand = z.infer<typeof createBrandValidationSchema>;
