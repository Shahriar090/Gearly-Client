import { useAttributeTemplate } from "@/hooks/useAttributeTemplate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  AttributeTemplateFormType,
  attributeTemplateValidationSchema,
} from "../schema/attribute_template_validation_schema";

type Props = {
  open: boolean;
  onClose: () => void;
  groupId: string | null;
};
const AttributeTemplateModal = ({ open, onClose, groupId }: Props) => {
  const { addAttribute } = useAttributeTemplate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AttributeTemplateFormType>({
    resolver: zodResolver(attributeTemplateValidationSchema),
    defaultValues: {
      required: false,
      filterable: false,
      sortable: false,
    },
  });

  const type = watch("type");

  const onSubmit = (payload: AttributeTemplateFormType) => {
    if (!groupId) return;

    addAttribute(groupId, {
      ...payload,
      id: crypto.randomUUID(),
    });

    reset();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 w-[500px] space-y-4 rounded">
        <h2 className="text-lg font-semibold">Add Attribute</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* name */}
          <input
            {...register("name")}
            placeholder="Name"
            className="border p-2 w-full"
          />

          <p className="text-red-500 text-sm">{errors.name?.message}</p>

          {/* Key */}
          <input
            {...register("key")}
            placeholder="Key (ram_size)"
            className="border p-2 w-full"
          />
          <p className="text-red-500 text-sm">{errors.key?.message}</p>

          {/* Type */}
          <select {...register("type")} className="border p-2 w-full">
            <option value="">Select Type</option>
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="array">Array</option>
            <option value="select">Select</option>
            <option value="multiSelect">Multi Select</option>
          </select>

          {/* Unit (only number) */}
          {type === "number" && (
            <input
              {...register("unit")}
              placeholder="Unit (GB, KG)"
              className="border p-2 w-full"
            />
          )}

          {/* Options (select/multiSelect) */}
          {(type === "select" || type === "multiSelect") && (
            <input
              {...register("options.0")}
              placeholder="Option 1"
              className="border p-2 w-full"
            />
          )}

          {/* Flags */}
          <div className="flex gap-4">
            <label>
              <input type="checkbox" {...register("required")} /> Required
            </label>
            <label>
              <input type="checkbox" {...register("filterable")} /> Filterable
            </label>
            <label>
              <input type="checkbox" {...register("sortable")} /> Sortable
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="bg-black text-white px-4 py-2">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttributeTemplateModal;
