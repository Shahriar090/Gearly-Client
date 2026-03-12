import { useEffect, useState } from "react";
import { useCategoryApi } from "./categoryApi";
import CategoryForm from "./CategoryForm";

// this component is responsible to assemble all 
// category related sub components / files
const AddCategoryPage = () => {
  const { getCategories } = useCategoryApi();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const cats = await getCategories();

      setCategories(cats.data);
    };

    fetchData();
  }, []);
  return (
    <div className="max-w-3xl mx-auto">
      <CategoryForm categories={categories} />
    </div>
  );
};

export default AddCategoryPage;
