import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TProduct } from "../products.types";

const ProductCategoryHeader = ({
  products,
  onLimitChange,
  onSortChange,
  currentSort,
}: {
  products: TProduct[];
  onLimitChange: (limit: number) => void;
  onSortChange: (
    sort: "price-low-to-high" | "price-high-to-low" | "default"
  ) => void;
  currentSort: "price-low-to-high" | "price-high-to-low" | "default";
}) => {
  const categoryName =
    products.length > 0 ? products[0].category.name : "Products";

  const totalProducts = products.length;
  const showTotalProducts =
    totalProducts <= 20
      ? [totalProducts]
      : [20, 40, 60].filter((num) => num <= totalProducts);

  const priceSortOptions = [
    {
      value: "default",
      label: "Default",
    },
    {
      value: "price-low-to-high",
      label: "Price (Low To High)",
    },
    {
      value: "price-high-to-low",
      label: "Price(High To Low)",
    },
  ];
  return (
    <div className="flex justify-between items-center bg-[var(--color-white)] shadow p-2">
      <h1 className="text-xl font-medium text-[var(--color-black)]">
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
    </div>
  );
};

export default ProductCategoryHeader;
