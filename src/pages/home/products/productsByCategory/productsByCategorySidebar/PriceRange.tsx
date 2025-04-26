import { Input } from "@/components/ui/input";
import { TPriceRange } from "../productsByCategory.types";
import React from "react";

const PriceRange = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}: TPriceRange) => {
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMaxPrice(value);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMinPrice(value);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMaxPrice(value);
  };
  return (
    <div className="shadow bg-[var(--color-white)]">
      <h1 className="text-lg font-medium text-[var(--color-gray)] p-3">
        Price Range
      </h1>
      {/* divider */}
      <div className="w-full h-0.5 bg-gray-100/50"></div>
      <div className="p-3">
        {" "}
        <div className="">
          <Input
            type="range"
            className="w-[180px] shadow-none"
            min={0}
            max={3000000}
            value={maxPrice}
            onChange={handleRangeChange}
          />
        </div>
        {/* min max input fields */}
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            value={minPrice}
            onChange={handleMinInputChange}
            className="w-[90px]"
          />
          <Input
            type="number"
            value={maxPrice}
            onChange={handleMaxInputChange}
            className="w-[90px]"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
