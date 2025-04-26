import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";

const Brands = () => {
  return (
    <div className="shadow bg-[var(--color-white)]">
      <Select>
        <SelectTrigger className="text-lg font-medium data-[placeholder]:text-[var(--color-gray)] p-3">
          <SelectValue placeholder="Brands" />
        </SelectTrigger>
        <SelectContent className="">
          <SelectItem value="apple">
            <div className="flex items-center space-x-4">
              <Input type="radio" className="w-4 h-4" />
              <span>Apple</span>
            </div>
          </SelectItem>
          <SelectItem value="samsung">
            <div className="flex items-center space-x-4">
              <Input type="radio" className="w-4 h-4" />
              <span>Samsung</span>
            </div>
          </SelectItem>
          <SelectItem value="huawei">
            <div className="flex items-center space-x-4">
              <Input type="radio" className="w-4 h-4" />
              <span>Huawei</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Brands;
