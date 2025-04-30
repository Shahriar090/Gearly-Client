import { z } from "zod";
import { AVAILABILITY_STATUS } from "./products.constants";

export const createProductValidationSchema = z.object({
  modelName: z.string().min(1, "Product Name Is Required").trim(),
  //   brand name means sub category name
  brandName: z.string().min(1, "Brand Name Is Required").trim(),
  description: z.string().min(1, "Description Is Required").trim(),
  price: z
    .number()
    .refine((val) => val >= 0, { message: "Price cannot be negative" }),
  discount: z
    .number()
    .refine((val) => val >= 0 && val <= 100, {
      message: "Discount must be between 0 and 100",
    })
    .optional(),

  tags: z
    .string() // Allow user to input a comma-separated string
    .transform((val) => val.split(",").map((tag) => tag.trim())) // Convert to array
    .refine((val) => val.length > 0, {
      message: "At least one tag is required",
    }) // Validate
    .or(z.array(z.string())) // Allow direct array input (optional, for flexibility)
    .default([]), // Default to empty array
  availabilityStatus: z.enum(
    Object.values(AVAILABILITY_STATUS) as [string, ...string[]]
  ),
  stock: z.number().min(0, "Stock Cannot Be Negative"),
  category: z.string().min(1, "Category ID Is Required").optional(),
  subCategory: z.string().optional(),
  brand: z.string().trim().optional(),
  images: z.array(z.instanceof(File)).optional(),
  specifications: z.array(
    z.object({
      groupName: z.string().optional(),
      fields: z.array(
        z.object({
          name: z.string().optional(),
          value: z.union([z.string(), z.number(), z.boolean()]),
        })
      ),
    })
  ),

  isFeatured: z.boolean().default(false).optional(),
  isDeleted: z.boolean().default(false).optional(),
});

export type TAddProduct = z.infer<typeof createProductValidationSchema>;
