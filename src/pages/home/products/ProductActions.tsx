"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

const ProductActions = () => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Quantity:</span>
        <div className="flex items-center border rounded-md overflow-hidden">
          <Button
            size="icon"
            variant="ghost"
            onClick={decrease}
            disabled={quantity === 1}
          >
            <Minus size={16} />
          </Button>
          <span className="px-4">{quantity}</span>
          <Button size="icon" variant="ghost" onClick={increase}>
            <Plus size={16} />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button variant="outline">Add To Cart</Button>
        <Button variant="default">Buy Now</Button>
      </div>
    </div>
  );
};

export default ProductActions;
