import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { TBrandItem } from "../productsByCategory.types";

type TBrandsProps = {
  brands: TBrandItem[];
  selectedBrand: string;
  onBrandChange: (value: string) => void;
};

const Brands = ({ brands, selectedBrand, onBrandChange }: TBrandsProps) => {
  return (
    <div className="shadow bg-[var(--color-white)]">
      <Select value={selectedBrand} onValueChange={onBrandChange}>
        <SelectTrigger className="text-lg font-medium data-[placeholder]:text-[var(--color-gray)] p-3">
          <SelectValue placeholder="Brands" />
        </SelectTrigger>
        <SelectContent className="">
          {brands?.map((b) => (
            <SelectItem key={b._id} value={b.brandName}>
              {b.brandName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Brands;
