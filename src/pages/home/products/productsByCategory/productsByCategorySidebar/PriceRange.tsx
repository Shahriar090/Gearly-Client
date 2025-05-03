import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { TPriceRange } from "../productsByCategory.types";
import React from "react";

const PriceRange = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}: TPriceRange) => {
  const MIN = 0;
  const MAX = 3000000;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice);
    setMinPrice(Math.max(MIN, value));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice);
    setMaxPrice(Math.min(MAX, value));
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    // Here you can choose whether this changes min or max depending on use case
    setMaxPrice(Math.max(minPrice, Math.min(value, MAX)));
  };

  const handleReset = () => {
    setMinPrice(MIN);
    setMaxPrice(MAX);
  };

  return (
    <div className="shadow bg-[var(--color-white)] rounded max-w-sm">
      <h1 className="text-lg font-medium text-[var(--color-gray)] p-3">
        Price Range
      </h1>

      <div className="w-full h-0.5 bg-gray-100/50"></div>

      <div className="p-3 space-y-3">
        {/* Display current selection */}
        <p className="text-sm text-[var(--color-gray)]">
          Showing products between{" "}
          <span className="font-medium">৳{minPrice.toLocaleString()}</span> and{" "}
          <span className="font-medium">৳{maxPrice.toLocaleString()}</span>
        </p>

        {/* error message */}
        {minPrice >= maxPrice && (
          <p className="capitalize text-[var(--color-red)] text-sm">
            Minimum price cannot be greater than max price
          </p>
        )}

        {/*  Single range input - controls max */}
        <Input
          type="range"
          className="w-full shadow-none"
          min={MIN}
          max={MAX}
          value={maxPrice}
          onChange={handleRangeChange}
        />

        {/* Number inputs */}
        <div className="flex items-center justify-between space-x-2">
          <Input
            type="number"
            min={MIN}
            max={MAX}
            value={minPrice}
            onChange={handleMinChange}
            className="w-[90px]"
          />
          <span className="text-sm">to</span>
          <Input
            type="number"
            min={MIN}
            max={MAX}
            value={maxPrice}
            onChange={handleMaxChange}
            className="w-[90px]"
          />
        </div>

        {/* Reset button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="mt-2 w-full"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default PriceRange;
