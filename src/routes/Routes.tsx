import { createBrowserRouter, RouteObject } from "react-router";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import UserDashboard from "../pages/dashboard/user/UserDashboard";

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
    element: <AdminDashboard />,
  },
  {
    path: "/users",
    element: <UserDashboard />,
  },
];

const router = createBrowserRouter(routes);
export default router;
