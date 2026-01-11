import {
  CircleHelp,
  Coins,
  CreditCard,
  Dices,
  Heart,
  House,
  LogIn,
  Package,
  ScanLine,
  Scroll,
  Settings,
  ShoppingCart,
  SmartphoneNfc,
  Truck,
  UserPen,
  UserRound,
  UsersRound,
  UsersRoundIcon,
  Zap,
} from "lucide-react";

// seller sidebar items (nav items)
export const sellerSidebarItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: <House /> },
  { label: "Analytics", to: "/admin/analytics", icon: <Package /> },
  { label: "Total Orders", to: "/admin/total-orders", icon: <ShoppingCart /> },
  { label: "Categories", to: "/admin/categories", icon: <CreditCard /> },
  { label: "Brands", to: "/admin/brands", icon: <Dices /> },
  { label: "Products", to: "/admin/products", icon: <ScanLine /> },
  { label: "Flash Sales", to: "/admin/flash-sales", icon: <Zap /> },
  { label: "Total Sales", to: "/admin/total-sales", icon: <Coins /> },
  {
    label: "Total Customers",
    to: "/admin/total-customers",
    icon: <UsersRoundIcon />,
  },
  { label: "Admin Profile", to: "/admin/admin-profile", icon: <UserPen /> },
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
