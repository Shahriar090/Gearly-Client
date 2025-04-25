import { createBrowserRouter, RouteObject } from "react-router";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import ProtectedRoutes from "./ProtectedRoutes";
import AdminLayout from "@/layouts/AdminLayout";
import UserLayout from "@/layouts/UserLayout";
import UserProfile from "@/pages/dashboard/user/UserProfile";
import UserDashboard from "@/pages/dashboard/user/UserDashboard";
import WishList from "@/pages/dashboard/user/WishList";
import Cart from "@/pages/dashboard/user/cart/Cart";
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import Analytics from "@/pages/dashboard/admin/Analytics";
import Orders from "@/pages/dashboard/user/Orders";
import TotalOrders from "@/pages/dashboard/admin/TotalOrders";
import Products from "@/pages/dashboard/admin/products/Products";
import Sales from "@/pages/dashboard/admin/Sales";
import Customers from "@/pages/dashboard/admin/Customers";
import AddProduct from "@/pages/dashboard/admin/products/AddProduct";
import Categories from "@/pages/dashboard/admin/categories/Categories";
import AddCategory from "@/pages/dashboard/admin/categories/AddCategory";
import Brands from "@/pages/dashboard/admin/brands/Brands";
import AddBrand from "@/pages/dashboard/admin/brands/AddBrand";
import AdminProfile from "@/pages/dashboard/admin/admin-profile/AdminProfile";
import FlashSales from "@/pages/dashboard/admin/flash-sales/FlashSales";
import AllProducts from "@/pages/home/products/AllProducts";
import ProductDetails from "@/pages/home/products/ProductDetails";
import AllFlashSales from "@/pages/home/flash-sale/AllFlashSales";
import Checkout from "@/pages/dashboard/user/checkout/Checkout";
import PaymentSuccess from "@/pages/dashboard/user/checkout/PaymentSuccess";
import PaymentFailed from "@/pages/dashboard/user/checkout/PaymentFailed";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "all-products",
        element: <AllProducts />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "all-flash-sales",
        element: <AllFlashSales />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoutes>
        <AdminLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "total-orders",
        element: <TotalOrders />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "add-category",
        element: <AddCategory />,
      },
      {
        path: "brands",
        element: <Brands />,
      },
      {
        path: "add-brand",
        element: <AddBrand />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "flash-sales",
        element: <FlashSales />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "total-sales",
        element: <Sales />,
      },
      {
        path: "total-customers",
        element: <Customers />,
      },
      {
        path: "admin-profile",
        element: <AdminProfile />,
      },
    ],
  },
  {
    path: "/users",
    element: (
      <ProtectedRoutes>
        <UserLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "dashboard",
        element: <UserDashboard />,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "wish-list",
        element: <WishList />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "payment-success/:tranId",
        element: <PaymentSuccess />,
      },
      // This route is for cash on delivery where tranId does not exist
      {
        path: "payment-success/",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-failed/:tranId",
        element: <PaymentFailed />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
