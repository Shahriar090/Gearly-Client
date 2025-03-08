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
  },
  {
    path: "/users",
    element: (
      <ProtectedRoutes>
        <UserLayout />,
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
