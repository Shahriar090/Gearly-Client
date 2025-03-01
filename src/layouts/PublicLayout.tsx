import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router";

const PublicLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default PublicLayout;
