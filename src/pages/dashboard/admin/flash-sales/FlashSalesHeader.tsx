import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const FlashSalesHeader = ({ onAddClick }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-semibold">Flash Sales</h2>
      <Button onClick={onAddClick}>
        <Plus className="mr-2 h-4 w-4" /> Add Flash Sale
      </Button>
    </div>
  );
};

export default FlashSalesHeader;
