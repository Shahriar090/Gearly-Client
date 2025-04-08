import { Button } from "@/components/ui/button";
import { bestSellingProducts } from "./bestSellingProductData";
import ProductCard from "./ProductCard";

const BestSellingProducts = () => {
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
                This Month
              </p>
            </div>
            <h1 className="text-xl md:text-2xl font-semibold text-[var(--color-black)] ">
              Best Selling Products
            </h1>
          </div>

          <div className="">
            <Button className="bg-[var(--color-blue)]">View All</Button>
          </div>
        </div>
        {/* divider div */}
        <div className="w-full h-0.5 bg-gray-100 mt-2"></div>

        {/* products */}
        <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 mt-4 p-4">
          {bestSellingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellingProducts;
