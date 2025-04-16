import useAxios from "@/hooks/useAxios";
import { useState } from "react";
import { createBrandValidationSchema, TAddBrand } from "./brands.validation";
import { toast } from "sonner";
import FormWrapper from "@/components/form/FormWrapper";
import InputField from "@/components/form/InputField";
import { useDropzone } from "react-dropzone";

const AddBrand = () => {
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

  const handleSubmit = async (brandData: TAddBrand) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append(
        "data",
        JSON.stringify({
          subCategory: {
            brandName: brandData.brandName,
            categoryName: brandData.categoryName,
            description: brandData.description,
          },
        })
      );

      if (image) formData.append("image", image);

      const response = await api.post(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/sub-categories/create-sub-category`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(response);
      toast.success("Brand Created Successfully!", {
        duration: 3000,
        position: "top-right",
      });
      setImage(null);
      setPreview(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to create brand", {
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <FormWrapper
      schema={createBrandValidationSchema}
      defaultValues={{
        brandName: "",
        categoryName: "",
        description: "",
        image: undefined,
      }}
      onSubmit={handleSubmit}
      submitButtonLabel={isSubmitting ? "Please Wait..." : "Add Brand"}
      submitButtonIsDisabled={isSubmitting}
    >
      {(form) => (
        <>
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
              {/* Brand name */}
              <InputField
                control={form.control}
                name="brandName"
                label="Brand Name"
                placeholder="Example: (Samsung, Apple, Dell, HP)"
              />
              {/* Category name */}
              <InputField
                control={form.control}
                name="categoryName"
                label="Category Name"
                placeholder="Example: (Smart Phones, Laptops, Gadgets)"
              />

              {/* Description */}
              <InputField
                control={form.control}
                name="description"
                label="Description"
                type="textarea"
              />
            </div>
          </div>
        </>
      )}
    </FormWrapper>
  );
};

export default AddBrand;
