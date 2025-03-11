import AdminNav from "@/pages/dashboard/admin/adminComponents/AdminNav";
import AdminSidebar from "@/pages/dashboard/admin/adminComponents/AdminSidebar";

import { useState } from "react";
import { Outlet } from "react-router";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  return (
    <div className="flex">
      <AdminNav toggleSidebar={toggleSidebar} />

      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-grow p-4 mt-16 md:ml-64">
        {" "}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
