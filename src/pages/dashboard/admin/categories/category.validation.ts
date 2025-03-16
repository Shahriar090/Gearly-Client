import { z } from "zod";

const specificationSchema = z.object({
  name: z.string().min(1, "Specification name is required"),
  type: z.enum(["string", "number", "boolean"], {
    message: "Invalid specification type",
  }),
  required: z.boolean().default(false),
});

const createCategoryValidationSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().min(1, "Description is required"),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "Image is required",
    })
    .optional(),
  specifications: z.array(specificationSchema).optional(),
});

export type TAddCategory = z.infer<typeof createCategoryValidationSchema>;
export { createCategoryValidationSchema };
