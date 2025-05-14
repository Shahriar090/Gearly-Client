import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TProduct } from "../products.types";
import { ListFilter } from "lucide-react";
import { useState } from "react";
import PriceRange from "./productsByCategorySidebar/PriceRange";
import Brands from "./productsByCategorySidebar/Brands";
import DynamicFiltering from "./productsByCategorySidebar/DynamicFiltering";
import { TBrandItem } from "./productsByCategory.types";

const ProductCategoryHeader = ({
  products,
  onLimitChange,
  onSortChange,
  currentSort,
  tempMinPrice,
  tempMaxPrice,
  setTempMinPrice,
  setTempMaxPrice,
  brands,
  selectedBrand,
  handleBrandChange,
}: {
  products: TProduct[];
  onLimitChange: (limit: number) => void;
  onSortChange: (
    sort: "price-low-to-high" | "price-high-to-low" | "default"
  ) => void;
  currentSort: "price-low-to-high" | "price-high-to-low" | "default";
  tempMinPrice: number;
  tempMaxPrice: number;
  setTempMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setTempMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  brands: TBrandItem[];
  selectedBrand: string;
  handleBrandChange: (brand: string) => void;
}) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const categoryName =
    products.length > 0 ? products[0].category.name : "Products";

  const totalProducts = products.length;
  const showTotalProducts =
    totalProducts <= 20
      ? [totalProducts]
      : [20, 40, 60].filter((num) => num <= totalProducts);

  const priceSortOptions = [
    { value: "default", label: "Default" },
    { value: "price-low-to-high", label: "Price (Low To High)" },
    { value: "price-high-to-low", label: "Price (High To Low)" },
  ];

  return (
    <div className="flex justify-between items-center bg-[var(--color-white)] shadow px-6 py-2">
      {/* filter button */}
      <div className="md:hidden">
        <button onClick={() => setIsMobileFilterOpen(true)}>
          <ListFilter />
        </button>
      </div>
      <h1 className="text-lg md:text-xl font-medium text-[var(--color-black)]">
        {categoryName}
      </h1>
      <div className="flex items-center space-x-2">
        {/* items amount */}
        <Select onValueChange={(value) => onLimitChange(Number(value))}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Show" />
          </SelectTrigger>
          <SelectContent>
            {showTotalProducts.map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num} Items
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* price sorting */}
        <Select
          value={currentSort}
          onValueChange={(value) =>
            onSortChange(value as "price-low-to-high" | "price-high-to-low")
          }
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            {priceSortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* sidebar for mobile to show filter items */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
          <div className="w-4/5 max-w-xs bg-white h-full shadow-lg p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setIsMobileFilterOpen(false)}>✕</button>
            </div>

            {/* Price Range */}
            <PriceRange
              minPrice={tempMinPrice}
              maxPrice={tempMaxPrice}
              setMinPrice={setTempMinPrice}
              setMaxPrice={setTempMaxPrice}
            />

            {/* Brands */}
            <Brands
              brands={brands}
              selectedBrand={selectedBrand}
              onBrandChange={handleBrandChange}
            />

            {/* Dynamic Filtering */}
            <DynamicFiltering products={products} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCategoryHeader;
