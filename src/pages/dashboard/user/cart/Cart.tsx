import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCart } from "@/hooks/useCart";
import { RefreshCcw, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Cart = () => {
  const {
    cart,
    loading,
    error,
    removeFromCart,
    updateCartQuantity,
    clearCart,
  } = useCart();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // initialize quantities from cart
  useEffect(() => {
    if (cart?.items?.length) {
      const initialQuantities: Record<string, number> = {};
      cart.items.forEach(({ product, quantity }) => {
        if (typeof product !== "string") {
          initialQuantities[product._id] = quantity;
        }
      });
      setQuantities(initialQuantities);
    }
  }, [cart]);

  const handleQuantityChange = (productId: string, value: number) => {
    if (value >= 1) {
      setQuantities((prev) => ({ ...prev, [productId]: value }));
    }
  };

  const handleUpdate = async (productId: string) => {
    const newQuantity = quantities[productId];
    if (newQuantity > 0) {
      try {
        await updateCartQuantity(productId, newQuantity);
      } catch (error) {
        console.error("Error Updating Quantity", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  if (!cart || cart.items?.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg">Your Cart Is Empty</p>
        <Button className="mt-4" onClick={() => navigate("/all-products")}>
          Continue Shopping
        </Button>
      </div>
    );
  }
  return (
    <div className="main-container">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <Button variant="default" onClick={clearCart}>
          <Trash /> Clear Cart
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table className="border-b-2">
          <TableHeader className="bg-[var(--color-bg-gray)] text-[var(--color-gray)]">
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart?.items?.map(({ product, quantity, price }) => {
              if (typeof product === "string") return null;
              return (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.images[0]}
                        alt={product.modelName}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{product.modelName}</TableCell>
                  <TableCell>${price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        className="w-20"
                        value={quantities[product._id] || quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            product._id,
                            parseInt(e.target.value)
                          )
                        }
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdate(product._id)}
                      >
                        <RefreshCcw />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>${(price * quantity).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFromCart(product._id)}
                    >
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="text-right space-y-2">
          <p className="">
            <span className="text-[var(--color-black)] text-lg font-medium">
              Total Items:
            </span>{" "}
            <span className="text-[var(--color-blue)]">
              {" "}
              {cart.items?.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </p>

          <p>
            <span className="text-lg text-[var(--color-black)] font-medium">
              Sub Total:
            </span>{" "}
            <span className="text-[var(--color-blue)] font-medium">
              ${cart.totalAmount.toFixed(2)}
            </span>
          </p>
        </div>
      </div>
      {/* coupon and voucher section */}
      {/* NOTE: It will by dynamic soon */}
      <div className="mt-10">
        <div className="mb-5">
          <h1 className="text-lg font-medium text-[var(--color-black)]">
            What would you like to do next?
          </h1>
          <p className="text-sm text-[var(--color-gray)]">
            Choose if you have a discount code or reward points you want to use
            or would like to estimate your delivery cost.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 bg-[var(--color-bg-gray)] p-4">
          <div className="flex items-center space-x-3">
            <Input
              type="text"
              placeholder="Promo / Coupon Code"
              className="w-full md:w-[400px]"
            />
            <Button variant="outline">Apply Coupon</Button>
          </div>
          <div className="flex items-center space-x-3">
            <Input
              type="text"
              placeholder="Enter Your Gift Voucher Code Here"
              className="w-full md:w-[400px]"
            />
            <Button variant="outline">Apply Voucher</Button>
          </div>
        </div>
      </div>
      <div className="mt-10 p-5">
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => navigate("/all-products")}>
            Continue Shopping
          </Button>
          <Button onClick={() => navigate("/users/checkout")}>
            Confirm Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
