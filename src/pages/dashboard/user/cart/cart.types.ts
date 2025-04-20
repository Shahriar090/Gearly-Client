import { TProduct } from "@/pages/home/products/products.types";
import { TUserProfile } from "../user.types";

export type TCartItem = {
  _id: string;
  product: string | TProduct;
  quantity: number;
  price: number;
  discount?: number;
  saved?: number;
  totalPrice: number;
  images?: string[];
  variant: string;
};

export type TCart = {
  _id: string;
  user: string | TUserProfile;
  items?: TCartItem[];
  totalAmount: number;
  discount: number;
  totalSaved: number;
  tax: number;
  shippingCharge: number;
  grandTotal: number;
  status: "Active" | "Saved" | "Abandoned";
  createdAt: string;
  updatedAt: string;
};

export type TCartContext = {
  cart: TCart | null;
  loading: boolean;
  error: string | null;
  addToCart: (
    productId: string,
    quantity?: number
  ) => Promise<{ success: boolean; message?: string }>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartCount: () => number;
  getCartTotal: () => number;
  fetchCart: () => Promise<void>;
};

export type TAddToCartModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: TProduct;
  quantity: number;
};
