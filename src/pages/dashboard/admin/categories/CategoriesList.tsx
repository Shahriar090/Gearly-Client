import { Button } from "@/components/ui/button";
import useAxios from "@/hooks/useAxios";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

type TCategory = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
};

const CategoriesList = () => {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { api } = useAxios();

  // Fetch categories data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/categories`
        );
        setCategories(response.data?.data);
      } catch (error) {
        setError("Failed to load categories");
        console.error("Error fetching categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [api]);

  //   delete

  const handleDelete = async (categoryId: string) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    setDeletingId(categoryId);
    try {
      await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/categories/${categoryId}`
      );
      setCategories(
        categories.filter((category) => category._id !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting category", error);
      alert("Failed to delete category");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="w-[300px] h-[300px] bg-gray-200 animate-pulse rounded-lg shadow-lg"
            />
          ))}
      </div>
    );

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center py-3">
        <h1 className="text-xl sm:text-2xl font-semibold text-black">
          All Categories
        </h1>

        <Link to="/admin/add-category">
          <Button size="sm">Add New Category</Button>
        </Link>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories?.slice(0, 4).map((category) => (
          <div
            key={category._id}
            className="relative group border shadow-lg rounded-lg overflow-hidden bg-white flex flex-col w-full h-[200px] cursor-pointer"
          >
            {/* Hero Banner (Background Image) */}
            <div
              className="relative w-full h-[200px] bg-cover bg-center flex items-center justify-center transition-all duration-500"
              style={{ backgroundImage: `url(${category.imageUrl})` }}
            >
              {/* Dark Overlay on Hover */}
              <div className="absolute inset-0 bg-black/50 transition-opacity duration-500"></div>

              {/* Heading (Initially Visible, Hides on Hover) */}
              <h2 className="relative z-10 text-white text-xl font-bold transition-all duration-500 group-hover:opacity-0">
                {category.name}
              </h2>

              {/* Hover Effect - Right Slide Panel */}
              <div className="absolute top-0 right-[-100%] h-full w-full bg-black/80 text-white flex flex-col items-center justify-center p-4 transition-all duration-500 group-hover:right-0">
                <p className="text-sm text-white opacity-90 text-center px-4">
                  {category.description}
                </p>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(category._id)}
                  disabled={deletingId === category._id}
                  className="mt-3"
                >
                  <Trash size={18} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
