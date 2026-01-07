import { NavLink } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  customerSidebarItems,
  publicNavItems,
  sellerSidebarItems,
} from "./SidebarItems";

type SidebarProps = {
  role: "seller" | "customer" | "public";
};
const AppSidebar = ({ role }: SidebarProps) => {
  return (
    <Sidebar>
      <SidebarHeader>
        {role === "seller"
          ? "Seller Dashboard"
          : role === "customer"
          ? "Customer Dashboard"
          : "Navigation"}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {role === "seller" && (
            <>
              {sellerSidebarItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <NavLink to={item.to}>
                    <SidebarMenuButton asChild>
                      <span>
                        <span>
                          {item.icon} {item.label}
                        </span>
                      </span>
                    </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </>
          )}

          {role === "customer" && (
            <>
              {customerSidebarItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <NavLink to={item.to}>
                    <SidebarMenuButton asChild>
                      <span>
                        <span>{item.icon}</span>
                        {item.label}
                      </span>
                    </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </>
          )}

          {role === "public" && (
            <>
              {publicNavItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <NavLink to={item.to}>
                    <SidebarMenuButton asChild>
                      <span>
                        <span>{item.icon}</span>
                        {item.label}
                      </span>
                    </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </>
          )}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
