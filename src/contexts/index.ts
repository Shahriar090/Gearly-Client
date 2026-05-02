import { TCartContext } from "@/pages/dashboard/user/cart/cart.types";
import { AttributeTemplateContextType } from "@/types/attribute_template/attribute_template_context_type";
import { TAuthContext } from "@/types/authTypes";
import { createContext } from "react";

const AuthContext = createContext<TAuthContext | undefined>(undefined);

const CartContext = createContext<TCartContext | undefined>(undefined);

const AttributeTemplateContext =
  createContext<AttributeTemplateContextType | null>(null);

export { AttributeTemplateContext, AuthContext, CartContext };
