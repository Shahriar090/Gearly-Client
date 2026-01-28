import { ChevronDown, ChevronUp, User2 } from "lucide-react";
import { NavLink } from "react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
    <Sidebar collapsible="icon">
      <SidebarHeader className="text-2xl text-black font-semibold truncate">
        {role === "seller"
          ? "Seller Dashboard"
          : role === "customer"
          ? "Customer Dashboard"
          : "Navigation"}
      </SidebarHeader>
      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild className="text-sm">
              <CollapsibleTrigger>
                Menu
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarContent>
                  <SidebarMenu>
                    {role === "seller" && (
                      <>
                        {sellerSidebarItems.map((item, index) => (
                          <SidebarMenuItem key={index}>
                            <NavLink to={item.to}>
                              <SidebarMenuButton asChild>
                                <span className="">
                                  {item.icon} {item.label}
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
                                  {item.icon} {item.label}
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
                                  {item.icon} {item.label}
                                </span>
                              </SidebarMenuButton>
                            </NavLink>
                          </SidebarMenuItem>
                        ))}
                      </>
                    )}
                  </SidebarMenu>
                </SidebarContent>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      {/* sidebar footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="min-w-[16rem]">
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
