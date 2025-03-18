import useAxios from "@/hooks/useAxios";
import { useState } from "react";

import { createBrandValidationSchema, TAddBrand } from "./brands.validation";
import { toast } from "sonner";
import FormWrapper from "@/components/form/FormWrapper";
import InputField from "@/components/form/InputField";

const AddBrand = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { api } = useAxios();

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

      if (brandData.image) formData.append("image", brandData.image);

      const response = await api.post(
        `${
          import.meta.env.VITE_LOCAL_SERVER_URL
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

          {/* Image upload */}
          <InputField
            control={form.control}
            name="image"
            label="Image"
            type="file"
          />
        </>
      )}
    </FormWrapper>
  );
};

export default AddBrand;
