import { TCartContext } from "@/pages/dashboard/user/cart/cart.types";
import { TAuthContext } from "@/types/authTypes";
import { createContext } from "react";

const AuthContext = createContext<TAuthContext | undefined>(undefined);

const CartContext = createContext<TCartContext | undefined>(undefined);

export { AuthContext, CartContext };
