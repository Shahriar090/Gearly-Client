import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const ProductActions = () => {
  const [quantity, setQuantity] = useState(0);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4">
      {/* quantity selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-[var(--color-gray)]">
          Quantity:
        </span>
        <div className="flex items-center border rounded-sm overflow-hidden">
          <Button
            size="icon"
            variant="ghost"
            onClick={decrease}
            disabled={quantity === 0}
          >
            <Minus size={20} />
          </Button>
          <span className="px-4 border-x">{quantity}</span>
          <Button size="icon" variant="ghost" onClick={increase}>
            <Plus size={20} />
          </Button>
        </div>
      </div>

      {/* action button */}
      <div className="flex items-center gap-2">
        <Button className="bg-[var(--color-blue)] px-10 py-5 rounded-sm text-sm font-semibold text-[var(--color-text)]">
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default ProductActions;
