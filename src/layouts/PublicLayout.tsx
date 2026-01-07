// import Navbar from "@/components/navbar/Navbar";
// import { Outlet } from "react-router";

import AppSidebar from "@/components/app-sidebar/AppSidebar";
import Navbar from "@/components/navbar/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

// const PublicLayout = () => {
//   return (
//     <div>
//       <Navbar />
//       <Outlet />
//     </div>
//   );
// };

// export default PublicLayout;

const PublicLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar role="public" />
      <main className="w-full">
        <Navbar />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default PublicLayout;
