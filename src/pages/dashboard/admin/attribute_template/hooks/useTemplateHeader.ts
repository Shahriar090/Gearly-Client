// hooks/useTemplateHeader.ts

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { api } from "@/api";
import { useAttributeTemplate } from "@/hooks/useAttributeTemplate";

import { createAttributeTemplate } from "../services/attribute_template_services";
import { transformeTemplate } from "../utils/transform_template";

const useTemplateHeader = () => {
  const { state, setTemplateMeta } = useAttributeTemplate();

  const [categories, setCategories] = useState<[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);

      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/categories`,
        );

        const allCategories = response.data?.data ?? [];

        const subCategories = allCategories.filter((category: any) =>
          Boolean(category.parentId),
        );

        setCategories(subCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);

        toast.error("Failed to load categories", {
          duration: 3000,
          position: "top-right",
        });
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Save template
  const handleSave = async () => {
    try {
      setIsSaving(true);

      const template = transformeTemplate(state);

      await createAttributeTemplate({ template });

      toast.success("Attribute Template Created Successfully", {
        duration: 3000,
        position: "top-right",
      });
    } catch (error) {
      console.error("Error creating template:", error);

      toast.error("Failed To Create Attribute Template!", {
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Field handlers
  const handleNameChange = (value: string) => {
    setTemplateMeta({ name: value });
  };

  const handleCategoryChange = (value: string) => {
    setTemplateMeta({ categoryId: value });
  };

  return {
    name: state.name,
    categoryId: state.categoryId,
    categories,
    isLoadingCategories,
    isSaving,
    onNameChange: handleNameChange,
    onCategoryChange: handleCategoryChange,
    onSave: handleSave,
  };
};

export default useTemplateHeader;
