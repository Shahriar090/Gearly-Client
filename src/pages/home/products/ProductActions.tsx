import { Button } from "@/components/ui/button";
import AddToCartModal from "@/pages/dashboard/user/cart/AddToCartModal";
import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { TProduct } from "./products.types";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

const ProductActions = ({ product }: { product: TProduct }) => {
  const [localQuantity, setLocalQuantity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const { auth } = useAuth();
  const { loading, updateCartQuantity, cart, addToCart } = useCart();

  //  find this product in the cart
  const cartItem = useMemo(() => {
    return cart?.items?.find(
      (item) =>
        typeof item.product !== "string" && item.product._id === product._id
    );
  }, [cart?.items, product._id]);

  // current quantity from cart or local state
  const quantity = cartItem?.quantity ?? localQuantity;

  const handleQuantityChange = async (newQuantity: number) => {
    if (!auth.user) {
      toast.error("Please Login To Proceed", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }
    try {
      if (cartItem) {
        await updateCartQuantity(product._id, newQuantity);
      } else {
        await addToCart(product._id, newQuantity);
      }
      setLocalQuantity(newQuantity);
    } catch (error) {
      console.error("Failed To Update Quantity", error);
      toast.error("Something Went Wrong");
    }
  };

  const increase = () => handleQuantityChange(quantity + 1);
  const decrease = () => handleQuantityChange(Math.max(1, quantity - 1));
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
            disabled={quantity === 1 || loading}
            onClick={decrease}
          >
            <Minus size={20} />
          </Button>
          <span className="px-4 border-x">{loading ? "..." : quantity}</span>
          <Button
            size="icon"
            variant="ghost"
            onClick={increase}
            disabled={loading}
          >
            <Plus size={20} />
          </Button>
        </div>
      </div>

      {/* action button */}
      <div className="flex items-center gap-2">
        <Button
          onClick={() => setModalOpen(true)}
          disabled={loading}
          className="bg-[var(--color-blue)] px-10 py-5 rounded-sm text-sm font-semibold text-[var(--color-text)]"
        >
          Buy Now
        </Button>

        <AddToCartModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          product={product}
          quantity={quantity}
        />
      </div>
    </div>
  );
};

export default ProductActions;
