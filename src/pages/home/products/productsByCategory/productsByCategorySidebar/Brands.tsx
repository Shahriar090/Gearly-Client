import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";

const Brands = ({ brands, selectedBrand, setSelectedBrand }) => {
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
          {brands?.result?.map((b) => (
            <SelectItem key={b._id} value={b.brandName}>
              <div className="flex items-center space-x-4">
                <Input
                  type="radio"
                  className="w-4 h-4"
                  checked={selectedBrand === b.brandName}
                  readOnly
                />
                <span>{b.brandName}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Brands;
