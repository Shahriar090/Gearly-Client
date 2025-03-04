import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

const Currency = () => {
  const [currency, setCurrency] = useState<string>("");

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);

    console.log("Selected currency:", value);
    console.log(currency);
  };
  return (
    <div>
      <Select onValueChange={handleCurrencyChange}>
        <SelectTrigger className="w-[150px] data-[placeholder]:text-white">
          <SelectValue placeholder="$ Currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="BDT">BDT</SelectItem>
          <SelectItem value="USD">USD</SelectItem>
          <SelectItem value="Euro">Euro</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Currency;
