import { useState } from "react";
import {
  createCategoryValidationSchema,
  TAddCategory,
} from "./category.validation";
import FormWrapper from "@/components/form/FormWrapper";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useAxios from "@/hooks/useAxios";
import { Plus, Trash } from "lucide-react";

const AddCategory = () => {
  const [specifications, setSpecifications] = useState<
    { name: string; type: "string" | "number" | "boolean"; required: boolean }[]
  >([{ name: "", type: "string", required: false }]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { api } = useAxios();

  const handleAddSpecification = () => {
    setSpecifications([
      ...specifications,
      { name: "", type: "string", required: false },
    ]);
  };

  const handleRemoveSpecification = (index: number) => {
    const updatedSpecifications = specifications.filter((_, i) => i !== index);
    setSpecifications(updatedSpecifications);
  };

  const handleSubmit = async (data: TAddCategory) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          category: {
            name: data.name,
            description: data.description,
            specifications: data.specifications,
          },
        })
      );

      if (data.image) formData.append("image", data.image);

      const response = await api.post(
        `${import.meta.env.VITE_LOCAL_SERVER_URL}/categories/create-category`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);

      toast.success("Category Created Successfully!", {
        duration: 3000,
        position: "top-right",
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to create category",
        {
          duration: 3000,
          position: "top-right",
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormWrapper
      schema={createCategoryValidationSchema}
      defaultValues={{
        name: "",
        description: "",
        image: undefined,
        specifications: specifications,
      }}
      onSubmit={handleSubmit}
      submitButtonLabel={isSubmitting ? "Adding Category..." : "Add Category"}
      submitButtonIsDisabled={isSubmitting}
    >
      {(form) => (
        <>
          {/* Category Name */}
          <InputField
            control={form.control}
            name="name"
            label="Category Name"
          />

          {/* Category Description */}
          <InputField
            control={form.control}
            name="description"
            label="Description"
            type="textarea"
          />

          {/* Image Upload */}
          <InputField
            control={form.control}
            name="image"
            label="Image"
            type="file"
          />

          {/* Specifications */}
          <div className="pt-4">
            <h3 className="text-lg font-semibold">
              Add Necessary Specifications A Product Could Have Under This
              Category
            </h3>
            {specifications.map((_, index) => (
              <div
                key={index}
                className="flex justify-between p-2 rounded-lg items-center shadow-lg space-x-4 mt-4"
              >
                <InputField
                  control={form.control}
                  name={`specifications.${index}.name`}
                  label="Name"
                />
                <InputField
                  control={form.control}
                  name={`specifications.${index}.type`}
                  label="Type"
                  type="select"
                  options={[
                    { label: "String (Text)", value: "string" },
                    { label: "Number (Integer - 1, 2)", value: "number" },
                    { label: "Boolean (True, False)", value: "boolean" },
                  ]}
                />
                <InputField
                  control={form.control}
                  name={`specifications.${index}.required`}
                  label="Required"
                  type="checkbox"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleRemoveSpecification(index)}
                >
                  <Trash />
                </Button>
              </div>
            ))}
            <div className="pt-2">
              {" "}
              <Button
                type="button"
                variant="ghost"
                onClick={handleAddSpecification}
              >
                <Plus />
              </Button>
            </div>
          </div>
        </>
      )}
    </FormWrapper>
  );
};

export default AddCategory;
