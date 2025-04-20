import { CartContext } from "@/contexts";
import useAxios from "@/hooks/useAxios";
import { TCart } from "@/pages/dashboard/user/cart/cart.types";
import React, { useEffect, useState } from "react";

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<TCart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { api } = useAxios();

  //   fetch cart
  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_LOCAL_URL}/cart/get-cart`
      );
      setCart(response.data?.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed To Fetch Cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  //   add to cart
  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_LOCAL_URL}/cart/add-to-cart`,
        {
          cart: {
            items: [{ product: productId, quantity: quantity }],
          },
        }
      );
      setCart(response.data?.data);
      await fetchCart();
      return { success: true };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed To Add To Cart";
      return { success: false, message };
    }
  };

  //   remove from cart
  const removeFromCart = async (productId: string) => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_LOCAL_URL}/cart/remove-item/${productId}`
      );
      console.log(response);
      setCart(response.data?.data);
      await fetchCart();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed To Remove From Cart"
      );
    }
  };

  //   update cart quantity
  const updateCartQuantity = async (productId: string, quantity: number) => {
    try {
      const response = await api.patch(
        `${
          import.meta.env.VITE_SERVER_LOCAL_URL
        }/cart/update-item/${productId}`,
        { quantity }
      );
      setCart(response.data?.data);
      await fetchCart();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed To Update Quantity"
      );
    }
  };

  //   clear cart
  const clearCart = async () => {
    try {
      await api.delete(
        `${import.meta.env.VITE_SERVER_LOCAL_URL}/cart/clear-cart`
      );
      setCart(null);
      await fetchCart();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed To Clear Cart");
    }
  };

  //   get cart count
  const getCartCount = () => {
    return cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  };

  const getCartTotal = () => {
    return cart?.totalAmount || 0;
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartCount,
        getCartTotal,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
