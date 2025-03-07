import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  //   checking user roles
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isUserRoute = location.pathname.startsWith("/users");

  if (isAdminRoute && auth.user.role !== "Admin") {
    return <Navigate to="/login" />;
  }

  if (isUserRoute && auth.user.role !== "Customer") {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
