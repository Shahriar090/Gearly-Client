import Sidebar from "@/pages/dashboard/user/Sidebar";
import { Outlet } from "react-router";

const UserLayout = () => {
  return (
    <div className="flex flex-col md:flex-row gap-0: sm:gap-4 w-full h-screen  bg-white">
      {/* sidebar */}
      <div className="sidebar w-full sm:w-[20%]">
        <Sidebar />
      </div>
      {/* outlet */}
      <div className="w-full sm:w-[80%] bg-white p-4 border border-red-500">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
