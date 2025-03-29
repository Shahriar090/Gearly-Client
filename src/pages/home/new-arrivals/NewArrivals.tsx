import { Button } from "@/components/ui/button";
import { newArrivalsData } from "./newArrivalsData";
import ProductCard from "./ProductCard";

const NewArrivals = () => {
  return (
    <div className="main-container mt-16 md:mt-6 px-4">
      <div className="bg-white shadow-lg">
        <div className="flex justify-between items-center px-4">
          <h1 className="text-xl font-semibold text-black">New Arrivals</h1>

          <Button variant="outline" size="sm">
            Shop All Products
          </Button>
        </div>
        {/* divider div */}
        <div className="w-full h-0.5 bg-gray-100 mt-2"></div>

        {/* products */}
        <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 mt-4 p-4">
          {newArrivalsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
