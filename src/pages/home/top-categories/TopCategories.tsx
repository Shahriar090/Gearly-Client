import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { topCategoriesData } from "./top-categories-data";

const TopCategories = () => {
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
        <div className="products grid grid-cols-2 md:grid-cols-6 gap-2 mt-4 p-4">
          {topCategoriesData.map((category) => (
            <Card
              key={category.id}
              className="text-center border shadow-none cursor-pointer hover:bg-[var(--color-text)]"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-28 h-28 object-cover rounded-sm mx-auto"
              />
              <h3 className="text-sm font-medium text-[var(--color-black)]">
                {category.name}
              </h3>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
