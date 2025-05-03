import React from "react";
import { TProduct } from "../../products.types";
import { extractSpecificationFilters } from "../productByCategory.utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type TProps = {
  products: TProduct[];
  selectedSpecifications: Record<string, string[]>;
  setSelectedSpecifications: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
};

const Specifications = ({
  products,
  selectedSpecifications,
  setSelectedSpecifications,
}: TProps) => {
  const specFilters = extractSpecificationFilters(products);

  const handleCheckBoxChange = (key: string, value: string) => {
    setSelectedSpecifications((prev) => {
      const currentValues = prev[key] || [];
      let updatedValues;

      if (currentValues.includes(value)) {
        updatedValues = currentValues.filter((v) => v !== value);
      } else {
        updatedValues = [...currentValues, value];
      }

      return {
        ...prev,
        [key]: updatedValues,
      };
    });
  };
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Specifications</h3>
      {Object.entries(specFilters).map(([key, values]) => (
        <div key={key} className="border-b pb-2">
          <p className="font-medium capitalize">{key}</p>
          <div className="flex flex-col gap-1 mt-1">
            {values.map((value) => (
              <Label key={value} className="flex items-center gap-2 text-sm">
                <Input
                  className="w-5 h-5"
                  type="checkbox"
                  checked={
                    selectedSpecifications[key]?.includes(value) || false
                  }
                  onChange={() => handleCheckBoxChange(key, value)}
                />
                {value}
              </Label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Specifications;
