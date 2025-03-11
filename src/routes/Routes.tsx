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
import Cart from "@/pages/dashboard/user/Cart";
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import Analytics from "@/pages/dashboard/admin/Analytics";
import Orders from "@/pages/dashboard/user/Orders";
import TotalOrders from "@/pages/dashboard/admin/TotalOrders";
import Products from "@/pages/dashboard/admin/Products";
import Sales from "@/pages/dashboard/admin/Sales";
import Customers from "@/pages/dashboard/admin/Customers";

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
        path: "products",
        element: <Products />,
      },
      {
        path: "total-sales",
        element: <Sales />,
      },
      {
        path: "total-customers",
        element: <Customers />,
      },
    ],
  },
  {
    path: "/users",
    element: (
      <UserLayout />
      // <ProtectedRoutes>
      // </ProtectedRoutes>
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
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
