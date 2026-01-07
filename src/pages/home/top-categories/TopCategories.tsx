import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useAxios from "@/hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TTopCategories } from "./topCategories.types";

const TopCategories = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<TTopCategories[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const { api } = useAxios();
  const navigate = useNavigate();
  // fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/categories`
        );

        setCategories(response.data?.data);
      } catch (error) {
        setError("Error Fetching Categories");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [api]);

  if (error) {
    return <p>Error Fetching Categories.! Please Try Again</p>;
  }
  if (loading) {
    return <p>Fetching Categories... Please Wait</p>;
  }
  return (
    <div className="main-container mt-16 md:mt-6 px-4">
      <div className="bg-white">
        {/* top categories */}
        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center md:gap-0 px-4">
          <div className="section-heading">
            {/* design div and heading */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-4 bg-[var(--color-blue)] rounded-sm"></div>
              <p className="text-sm font-semibold text-[var(--color-black)]">
                Categories
              </p>
            </div>
            <h1 className="text-xl md:text-2xl font-semibold text-[var(--color-black)] ">
              Browse By Category
            </h1>
          </div>

          <div className="">
            <Button className="bg-[var(--color-blue)]">
              See All Categories
            </Button>
          </div>
        </div>
        {/* divider div */}
        <div className="w-full h-0.5 bg-gray-100 mt-2"></div>

        {/* top categories */}
        <div className="categories grid grid-cols-2 md:grid-cols-6 gap-2 mt-4 p-4">
          {categories?.map((category) => {
            return (
              <Card
                key={category._id}
                onClick={() => navigate(`/category/${category.slug}`)}
                className="text-center shadow-none cursor-pointer py-4 gap-4 max-w-[250px] rounded-xs"
              >
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-24 h-24 object-cover rounded-sm mx-auto"
                />
                <h3 className="text-sm font-medium text-[var(--color-black)]">
                  {category.name}
                </h3>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
