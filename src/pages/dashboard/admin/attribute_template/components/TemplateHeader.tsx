import { api } from "@/api";
import { useAttributeTemplate } from "@/hooks/useAttributeTemplate";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createAttributeTemplate } from "../services/attribute_template_services";
import { transformeTemplate } from "../utils/transform_template";

const TemplateHeader = () => {
  const { state, setTemplateMeta } = useAttributeTemplate();

  const [categoris, setCategories] = useState<[]>([]);

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/categories`,
        );
        const allCategories = res.data?.data;

        const subCategories = allCategories.filter((cat: any) => cat.parentId);

        setCategories(subCategories);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);
  const handleSave = async () => {
    try {
      const template = transformeTemplate(state);

      await createAttributeTemplate({
        template,
      });
      toast.success("Attribute Template Created Successfully", {
        duration: 3000,
        position: "top-right",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed To Create Attribute Template! ", {
        duration: 3000,
        position: "top-right",
      });
    }
  };
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex gap-4 w-full">
        <input
          type="text"
          placeholder="Template Name"
          value={state.name}
          onChange={(e) => setTemplateMeta({ name: e.target.value })}
          className="border p-2 w-1/2"
        />

        <select
          value={state.categoryId}
          onChange={(e) => setTemplateMeta({ categoryId: e.target.value })}
          className="border p-2 w-1/2"
        >
          <option>Select Category</option>
          {categoris.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSave}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
};

export default TemplateHeader;
