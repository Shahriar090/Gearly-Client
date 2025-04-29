import { z } from "zod";

// Define the individual specification schema (fields in each group)
const specificationSchema = z.object({
  name: z.string().min(1, "Specification name is required"),
  type: z.enum(["string", "number", "boolean"], {
    message: "Invalid specification type",
  }),
  required: z.boolean().default(false),
});

// Define the schema for a specification group (group of fields)
const specificationGroupSchema = z.object({
  groupName: z.string().min(1, "Group name is required"),
  fields: z
    .array(specificationSchema)
    .min(1, "At least one specification field is required"),
});

// Define the main schema for creating a category
const createCategoryValidationSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().min(1, "Description is required"),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "Image is required",
    })
    .optional(),
  specifications: z.array(specificationGroupSchema).optional(),
});

export type TAddCategory = z.infer<typeof createCategoryValidationSchema>;
export { createCategoryValidationSchema };
