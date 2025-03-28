import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { topCategoriesData } from "./top-categories-data";

const TopCategories = () => {
  return (
    <div className="main-container mt-16 md:mt-6 px-4">
      <div className="bg-white shadow-lg">
        <div className="flex justify-between items-center  px-4">
          <h1 className="text-xl md:text-2xl font-semibold text-black">
            Top Categories
          </h1>
          <Button variant="outline" size="sm">
            View All Categories
          </Button>
        </div>
        {/* divider div */}
        <div className="w-full h-0.5 bg-gray-100 mt-2"></div>

        {/* top categories */}
        <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 mt-4 p-4">
          {topCategoriesData.map((category) => (
            <Card
              key={category.id}
              className="text-center p-4 shadow-lg cursor-pointer hover:bg-gray-100"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
