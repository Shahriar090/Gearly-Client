import { CartContext } from "@/contexts";
import { useContext } from "react";

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart Must Be Used Within A Cart Provider");
  }

  return context;
};
