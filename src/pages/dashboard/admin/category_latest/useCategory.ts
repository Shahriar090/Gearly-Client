import { useState } from "react";
import { toast } from "sonner";
import { useCategoryApi } from "./categoryApi";
import { TCreateCategory } from "./categoryValidation";


// category related business logic
// this hook knows about: form data, image, submission state and API
export const useCategory = () => {
  const { createCategory } = useCategoryApi();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateCategory = async (
    payload: TCreateCategory,
    image: File | null,
  ) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      const categoryData = {
        category: {
          name: payload.name,
          description: payload.description,
          status: payload.status,
          parentId: payload.parentId || null,
          attributeTemplateId: payload.attributeTemplateId || null,
        }
      };

      formData.append("data", JSON.stringify(categoryData));


      if (image) {
        formData.append("image", image);
      }


      await createCategory(formData);

      toast.success("Category created successfully");
      return true
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to create category",
      );
      return false
    }finally{
      setIsSubmitting(false)
    }
  };

  return {
    handleCreateCategory,
    isSubmitting
  }
};
