import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Availability = () => {
  return (
    <div className="shadow bg-[var(--color-white)]">
      <Select>
        <SelectTrigger className="text-lg font-medium data-[placeholder]:text-[var(--color-gray)] p-3">
          <SelectValue placeholder="Availability" />
        </SelectTrigger>
        <SelectContent className="">
          <SelectItem value="in-stock">
            <div className="flex items-center space-x-4">
              <Input type="radio" className="w-4 h-4" />
              <span>In Stock</span>
            </div>
          </SelectItem>
          <SelectItem value="pre-order">
            <div className="flex items-center space-x-4">
              <Input type="radio" className="w-4 h-4" />
              <span>Pre Order</span>
            </div>
          </SelectItem>
          <SelectItem value="up-coming">
            <div className="flex items-center space-x-4">
              <Input type="radio" className="w-4 h-4" />
              <span>Upcoming</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Availability;
