import useAxios from "@/hooks/useAxios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  createCategoryValidationSchema,
  TAddCategory,
} from "./category.validation";
import { toast } from "sonner";
import FormWrapper from "@/components/form/FormWrapper";
import InputField from "@/components/form/InputField";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

const AddCategory = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { api } = useAxios();

  const { getRootProps, getInputProps } = useDropzone({
    // If needed, specific extensions like .png, .jpg, .jpeg can be added inside the array to allow only certain image types.
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImage(file);
      // temporary URL to instantly show a preview
      setPreview(URL.createObjectURL(file));
    },
  });

  // Initializing form with default values
  const defaultValues = {
    name: "",
    description: "",
    image: undefined,
    specifications: [
      {
        groupName: "General Specifications",
        fields: [{ name: "", type: "string" as const, required: false }],
      },
    ],
  };

  // submit handler
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

      await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/categories/create-category`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Category Created Successfully", {
        duration: 3000,
        position: "top-right",
      });

      // reset form
      setImage(null);
      setPreview(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(
        error?.response?.data?.message || "Failed TO Create Category",
        { duration: 3000, position: "top-right" }
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <FormWrapper
      schema={createCategoryValidationSchema}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      submitButtonLabel={
        isSubmitting ? "Creating Category..." : "Create Category"
      }
      submitButtonIsDisabled={isSubmitting}
    >
      {(form) => {
        // get curren specifications from form
        const specifications =
          form.watch("specifications") || defaultValues.specifications;

        // Since the form instance is only available inside the render function of FormWrapper, we define these handler functions here to access and update form values directly.
        const handleAddSpecifications = (groupIndex: number) => {
          const updatedSpecifications = [...specifications];
          updatedSpecifications[groupIndex].fields.push({
            name: "",
            type: "string",
            required: false,
          });
          form.setValue("specifications", updatedSpecifications);
        };
        const handleRemoveSpecifications = (
          groupIndex: number,
          specIndex: number
        ) => {
          const updatedSpecifications = [...specifications];
          updatedSpecifications[groupIndex].fields.splice(specIndex, 1);
          form.setValue("specifications", updatedSpecifications);
        };

        const handleAddSpecificationGroup = () => {
          form.setValue("specifications", [
            ...specifications,
            {
              groupName: "New Group",
              fields: [{ name: "", type: "string", required: false }],
            },
          ]);
        };

        const handleGroupNameChange = (groupIndex: number, value: string) => {
          const updatedSpecifications = [...specifications];
          updatedSpecifications[groupIndex].groupName = value;
          form.setValue("specifications", updatedSpecifications);
        };

        return (
          <div className="space-y-6">
            {/* image upload section */}
            <div className="shadow-md border p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">
                Add A Thumbnail Photo
              </h3>
              <div
                {...getRootProps()}
                className="border-2 w-full h-60 border-dashed border-[var(--color-gray)] p-6 rounded-lg flex items-center justify-center flex-col space-y-2 cursor-pointer bg-[var(--color-bg-gray)] hover:bg-gray-100"
              >
                <input {...getInputProps()} />
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview Image"
                    className="w-40 h-40 mx-auto object-cover rounded-md"
                  />
                ) : (
                  <p className="text-xs text-[var(--color-black)] font-semibold">
                    Drop Your Image Here Or Click To Browse
                  </p>
                )}
                <p className="text-xs text-[var(--color-gray)]">
                  Supported Formats: PNG, JPG, JPEG, (Max: 5MB)
                </p>
              </div>
            </div>

            {/* General information section */}
            <div className="general-info shadow-md border p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4 border-b pb-2">
                General Information
              </h3>

              <div className="space-y-4">
                <InputField
                  control={form.control}
                  name="name"
                  label="Category Name"
                  placeholder="Example: (Smart Phones, Laptops, Gadgets)"
                />
                <InputField
                  control={form.control}
                  name="description"
                  type="textarea"
                  label="Category Description"
                  placeholder="Enter a minimum description about this category"
                />
              </div>
            </div>

            {/* specifications section */}
            <div className="shadow-md border p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">
                Add Necessary Specifications A Product Could Have Under This
                Category
              </h3>
              {specifications?.map((specGroup, groupIndex) => (
                <div key={groupIndex} className="p-4 rounded-lg border mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">
                      Specifications Group {groupIndex + 1}
                    </h4>
                  </div>

                  {/* group name input */}
                  <div className="mb-4">
                    <Label className="mb-1">Group Name</Label>
                    <Input
                      type="text"
                      value={specGroup.groupName}
                      onChange={(e) =>
                        handleGroupNameChange(groupIndex, e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  {specGroup.fields.map((_, specIndex) => (
                    <div
                      key={specIndex}
                      className="p-3 rounded border mb-3 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
                    >
                      <InputField
                        control={form.control}
                        name={`specifications.${groupIndex}.fields.${specIndex}.name`}
                        label="Field Name"
                        placeholder="e.g. Color, Display Size"
                      />
                      <InputField
                        control={form.control}
                        name={`specifications.${groupIndex}.fields.${specIndex}.type`}
                        label="Type"
                        type="select"
                        options={[
                          {
                            label: "Text",
                            value: "string",
                          },
                          {
                            label: "Number",
                            value: "number",
                          },
                          {
                            label: "Boolean (True Or False)",
                            value: "boolean",
                          },
                        ]}
                      />
                      <div className="flex items-center gap-2">
                        <InputField
                          control={form.control}
                          name={`specifications.${groupIndex}.fields.${specIndex}.required`}
                          label="Required"
                          type="checkbox"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          handleRemoveSpecifications(groupIndex, specIndex)
                        }
                        className="w-full md:w-auto"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddSpecifications(groupIndex)}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Field
                  </Button>
                </div>
              ))}

              <div className="flex justify-between mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddSpecificationGroup}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Group
                </Button>
              </div>
            </div>
          </div>
        );
      }}
    </FormWrapper>
  );
};

export default AddCategory;
