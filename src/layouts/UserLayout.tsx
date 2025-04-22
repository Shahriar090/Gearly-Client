import Sidebar from "@/pages/dashboard/user/Sidebar";
import { Outlet } from "react-router";

const UserLayout = () => {
  return (
    <div className="flex flex-col md:flex-row">
      {/* sidebar */}
      <div className="sidebar w-full lg:w-[20%]">
        <Sidebar />
      </div>
      {/* outlet */}
      <div className="w-full lg:w-[80%] p-5 bg-[var(--color-bg-gray)]">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
