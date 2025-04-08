import { Button } from "@/components/ui/button";
import { newArrivalsData } from "./newArrivalsData";
import ProductCard from "./ProductCard";

const NewArrivals = () => {
  return (
    <div className="main-container mt-16 md:mt-6 px-4">
      <div className="bg-white">
        {/* new arrivals */}
        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center md:gap-0 px-4">
          <div className="section-heading">
            {/* design div and heading */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-4 bg-[var(--color-blue)] rounded-sm"></div>
              <p className="text-sm font-semibold text-[var(--color-black)]">
                Latest
              </p>
            </div>
            <h1 className="text-xl md:text-2xl font-semibold text-[var(--color-black)] ">
              New Arrivals
            </h1>
          </div>

          <div className="">
            <Button className="bg-[var(--color-blue)]">See All</Button>
          </div>
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
