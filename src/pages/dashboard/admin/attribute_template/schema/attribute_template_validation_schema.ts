import { z } from "zod";

export const attributeTemplateValidationSchema = z
  .object({
    name: z.string().min(1, "Name is required!"),
    key: z
      .string()
      .min(1)
      .regex(/^[a-z0-9_]+$/, "Only lowercase + underscore"),
    type: z.enum([
      "string",
      "number",
      "boolean",
      "array",
      "select",
      "multiSelect",
    ]),
    unit: z.string().optional(),
    // options: z.array(z.string().optional()),
    options: z.array(z.string()).default([]),
    required: z.boolean().default(false),
    filterable: z.boolean().default(false),
    sortable: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    // select / multiselect must have options

    if (
      (data.type === "select" || data.type === "multiSelect") &&
      (!data.options || data.options.length === 0)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["options"],
        message: "Options required!",
      });
    }

    // unit only for number

    if (data.unit && data.type !== "number") {
      ctx.addIssue({
        code: "custom",
        path: ["unit"],
        message: "Unit only allowed for number",
      });
    }
  });

// infered type

export type AttributeTemplateFormType = z.infer<
  typeof attributeTemplateValidationSchema
>;
