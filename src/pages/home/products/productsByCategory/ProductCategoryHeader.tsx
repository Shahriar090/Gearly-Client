import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TProductsByCategory } from "./productsByCategory.types";

const ProductCategoryHeader = ({
  products,
  onLimitChange,
  onSortChange,
}: {
  products: TProductsByCategory[];
  onLimitChange: (limit: number) => void;
  onSortChange: (sort: "low-to-high" | "high-to-low" | "default") => void;
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
      value: "low-to-high",
      label: "Price (Low To High)",
    },
    {
      value: "high-to-low",
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
          onValueChange={(value) =>
            onSortChange(value as "low-to-high" | "high-to-low")
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
