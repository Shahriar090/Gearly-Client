import {
  CircleHelp,
  CreditCard,
  Heart,
  House,
  LogIn,
  Package,
  Scroll,
  Settings,
  ShoppingCart,
  SmartphoneNfc,
  Truck,
  UserRound,
  UsersRound,
} from "lucide-react";

// seller sidebar items (nav items)
export const sellerSidebarItems = [
  { label: "Overview", to: "/seller/dashboard", icon: <House /> },
  { label: "Products", to: "/seller/products", icon: <Package /> },
  { label: "Orders", to: "/seller/orders", icon: <ShoppingCart /> },
  { label: "Payments", to: "/seller/payments", icon: <CreditCard /> },
  { label: "Settings", to: "/seller/settings", icon: <Settings /> },
];

// customer sidebar items (nav items)

export const customerSidebarItems = [
  { label: "Overview", to: "/customer/dashboard", icon: <House /> },
  { label: "My Orders", to: "/customer/my-orders", icon: <Truck /> },
  { label: "Wishlist", to: "/customer/wishlist", icon: <Heart /> },
  { label: "Profile", to: "/customer/profile", icon: <UserRound /> },
  { label: "Support", to: "/customer/support", icon: <CircleHelp /> },
  { label: "Settings", to: "/customer/settings", icon: <Settings /> },
];

// general nav items
export const publicNavItems = [
  { label: "Home", to: "/", icon: <House /> },
  { label: "All Products", to: "/all-products", icon: <Package /> },
  { label: "About Us", to: "/about-us", icon: <UsersRound /> },
  { label: "Blog", to: "/blog", icon: <Scroll /> },
  { label: "Login", to: "/login", icon: <LogIn /> },
  { label: "Contact", to: "/contact", icon: <SmartphoneNfc /> },
];
