import { useNavigate } from "react-router";
import { TAddToCartModalProps } from "./cart.types";
import { useCart } from "@/hooks/useCart";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";

const AddToCartModal = ({
  open,
  onOpenChange,
  product,
  quantity,
}: TAddToCartModalProps) => {
  const navigate = useNavigate();
  const { getCartCount, getCartTotal, addToCart } = useCart();

  const handleAddToCart = async () => {
    const { success } = await addToCart(product._id, quantity);
    if (!success) {
      toast.error("Failed To Add To Cart");
      console.error("Failed to add to cart");
    }
  };

  useEffect(() => {
    if (open) {
      handleAddToCart();
    }
  }, [open]);

  //  view cart
  const handleViewCart = () => {
    navigate("/users/cart", { replace: true });
    onOpenChange(false);
  };

  //   checkout
  const handleCheckout = () => {
    navigate("/users/checkout");
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        {/* Mobile Layout (stacked vertically) */}
        <div className="flex flex-col gap-4 md:hidden">
          {/* Heading - Full width */}
          <DialogHeader>
            <DialogTitle className="text-lg text-start">
              You Have Added &quot;
              <span className="text-[var(--color-blue)]">
                {product.modelName}
              </span>
              &quot; To Your Cart
            </DialogTitle>
          </DialogHeader>

          {/* Cart Options - Full width */}
          <div className="space-y-2 border p-2 rounded-lg">
            <p className="text-sm flex justify-between items-center">
              <span className="text-[var(--color-gray)]">Cart Quantity:</span>{" "}
              <span className="text-[var(--color-black)] font-semibold">
                {" "}
                {getCartCount()}
              </span>
            </p>
            <p className="text-sm flex justify-between items-center">
              <span className="text-[var(--color-gray)]">Cart Total:</span>{" "}
              <span className="text-[var(--color-black)] font-semibold">
                {" "}
                ${getCartTotal().toFixed(2)}
              </span>
            </p>
          </div>

          {/* Buttons - Full width */}
          <div className="flex  gap-2">
            <Button
              variant="default"
              onClick={handleViewCart}
              className="w-full sm:w-auto"
            >
              View Cart
            </Button>
            <Button
              variant="outline"
              onClick={handleCheckout}
              className="w-full sm:w-auto"
            >
              Confirm Order
            </Button>
          </div>
        </div>

        {/* Desktop Layout (70/30 split) */}
        <div className="hidden md:flex gap-6">
          {/* Left side (70%) */}
          <div className="flex-1" style={{ flex: "0 0 70%" }}>
            <DialogHeader>
              <DialogTitle className="text-lg font-medium text-start">
                You Have Added &quot;
                <span className="text-[var(--color-blue)]">
                  {product.modelName}
                </span>
                &quot; To Your Cart
              </DialogTitle>
            </DialogHeader>

            <div className="flex gap-4 mt-4">
              <Button variant="default" onClick={handleViewCart}>
                View Cart
              </Button>
              <Button variant="outline" onClick={handleCheckout}>
                Confirm Order
              </Button>
            </div>
          </div>

          {/* Right side (30%) */}
          <div className="flex-1 px-2" style={{ flex: "0 0 30%" }}>
            <div className="space-y-2 border p-4 rounded-sm h-full">
              <p className="text-sm text-[var(--color-gray)]">
                Cart Quantity: {getCartCount()}
              </p>
              <div className="w-full h-0.5 bg-gray-100/50"></div>
              <p className="font-semibold text-sm">
                Cart Total: ${getCartTotal().toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartModal;
