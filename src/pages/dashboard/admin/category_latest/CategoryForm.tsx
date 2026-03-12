import FormWrapper from "@/components/form/FormWrapper";
import InputField from "@/components/form/InputField";
import { useState } from "react";
import CategoryImageUpload from "./category.image.upload";
import { categoryBaseSchema, TCategory, TCreateCategory } from "./categoryValidation";
import { useCategory } from "./useCategory";

// this component is responsible for organizing the category form
type CategoryFormProps = {
  categories : TCategory[]
}

const CategoryForm = ({ categories}:CategoryFormProps) => {
  const { handleCreateCategory, isSubmitting } = useCategory();

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);


  const defaultValues = {
    name: "",
    description: "",
    parentId: null,
    attributeTemplateId: null,
    status: "Active",
  };

  const onSubmit = (payload: TCreateCategory) => {
    // This extra configuration for payload and parentId is to 
    // satisfy the TS about giving error while I tried to give 
    // value: null in parentId input
    // so i have added value : "none" then convert this "none"
    // to null before sending it to back end
    const formattedPayload = {
      ...payload,
      parentId : payload.parentId === "none" ? null : payload.parentId
    }
    handleCreateCategory(formattedPayload, image);
  };
  return (
    <FormWrapper
      schema={categoryBaseSchema}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      submitButtonLabel={isSubmitting ? "Creating..." : "Create Category"}
    >
      {(form) => (
        <div className="space-y-6">
          <CategoryImageUpload
            image={image}
            setImage={setImage}
            preview={preview}
            setPreview={setPreview}
          />

          <InputField
            control={form.control}
            name="name"
            label="Category Name"
          />

          <InputField
            control={form.control}
            name="description"
            label="Description"
            type="textarea"
          />

          <InputField
            control={form.control}
            name="parentId"
            label="Parent Category"
            type="select"
            options={[
              { label: "None (Root Category)", value: 'none' },
              ...categories.map((c) => ({
                label: c.name,
                value: c._id,
              })),
            ]}
          />

          {/* <InputField
            control={form.control}
            name="attributeTemplateId"
            label="Attribute Template"
            type="select"
            options={[
              { label: "None", value: null },
              ...templates.map((t) => ({
                label: t.name,
                value: t._id,
              })),
            ]}
          /> */}

          <InputField
            control={form.control}
            name="status"
            label="Status"
            type="select"
            options={[
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ]}
          />
        </div>
      )}
    </FormWrapper>
  );
};

export default CategoryForm;
