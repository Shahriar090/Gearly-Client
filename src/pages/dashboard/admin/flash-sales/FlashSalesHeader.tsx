import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TFlashSalesHeaderProps } from "./flashSales.types";

const FlashSalesHeader = ({ onAddClick }: TFlashSalesHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-semibold">Flash Sales</h2>
      <Button onClick={onAddClick}>
        <Plus className="h-4 w-4" /> Add Flash Sale
      </Button>
    </div>
  );
};

export default FlashSalesHeader;
