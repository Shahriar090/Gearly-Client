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
import { useDropzone } from "react-dropzone";

const AddCategory = () => {
  const [specifications, setSpecifications] = useState<
    { name: string; type: "string" | "number" | "boolean"; required: boolean }[]
  >([{ name: "", type: "string", required: false }]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  // State for image upload
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { api } = useAxios();

  // handling drag and drop
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImage(file);
      // show image preview
      setPreview(URL.createObjectURL(file));
    },
  });

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

      if (image) formData.append("image", image);

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
      setImage(null);
      setPreview(null);
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
        <div>
          {/* drag and drop for image upload */}
          <div className="shadow-md border p-4">
            <h3 className="text-lg font-medium mb-2">Add A Thumbnail Photo</h3>
            <div
              {...getRootProps()}
              className="border-2 w-full h-60 border-dashed border-gray-300 p-6 rounded-lg flex items-center justify-center flex-col space-y-2 cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <input {...getInputProps()} />

              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-40 mx-auto object-cover rounded-md"
                />
              ) : (
                <p className="text-black font-semibold">
                  Drop your image here or click to browse
                </p>
              )}
              <p className="text-xs text-gray-700">
                Supported formats: PNG, JPG, JPEG (Max: 5MB)
              </p>
            </div>
          </div>
          <div className="general-info shadow-md border p-4">
            <h3 className="text-lg font-medium mb-4 border-b">
              General Information
            </h3>
            <div className="space-y-2">
              {/* Category Name */}
              <InputField
                control={form.control}
                name="name"
                label="Category Name"
                placeholder="Example: (Smart Phones, Laptops)"
              />

              {/* Category Description */}
              <InputField
                control={form.control}
                name="description"
                type="textarea"
                label="Category Description"
                placeholder="Enter a minimum description about this category"
              />
            </div>
          </div>

          {/* Specifications */}
          <div className="shadow-md border p-4">
            <h3 className="text-lg font-medium">
              Add Necessary Specifications A Product Could Have Under This
              Category
            </h3>
            {specifications.map((_, index) => (
              <div
                key={index}
                className="p-2 rounded-lg shadow-lg mt-4 flex flex-col gap-4 sm:flex-row sm:justify-between"
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
        </div>
      )}
    </FormWrapper>
  );
};

export default AddCategory;
