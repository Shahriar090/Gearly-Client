import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";

const Brands = ({ brands, selectedBrand, setSelectedBrand }) => {
  console.log(brands, "from product by category");
  return (
    <div className="shadow bg-[var(--color-white)]">
      <Select
        value={selectedBrand}
        onValueChange={(value) => setSelectedBrand(value)}
      >
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
