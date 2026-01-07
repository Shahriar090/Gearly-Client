// import Sidebar from "@/pages/dashboard/user/Sidebar";
// import { Outlet } from "react-router";

import AppSidebar from "@/components/app-sidebar/AppSidebar";
import Navbar from "@/components/navbar/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

// const UserLayout = () => {
//   return (
//     <div className="flex flex-col md:flex-row">
//       {/* sidebar */}
//       <div className="sidebar w-full lg:w-[20%]">
//         <Sidebar />
//       </div>
//       {/* outlet */}
//       <div className="w-full lg:w-[80%] bg-[var(--color-bg-gray)]">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default UserLayout;

const UserLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar role="customer" />
      <main className="w-full">
        <Navbar />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default UserLayout;
