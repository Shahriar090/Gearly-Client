import { useState } from "react";
import {
  Menu,
  Home,
  ShoppingBag,
  Heart,
  ShoppingCart,
  User,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
const sidebarItems = [
  {
    name: "Home",
    path: "/",
    icon: <Home className="w-6 h-6" />,
  },
  {
    name: "Orders",
    path: "/users/orders",
    icon: <ShoppingBag className="w-6 h-6" />,
  },
  {
    name: "Wishlist",
    path: "/users/wishlist",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    name: "Cart",
    path: "/users/cart",
    icon: <ShoppingCart className="w-6 h-6" />,
  },
  {
    name: "Profile",
    path: "/users/user-profile",
    icon: <User className="w-6 h-6" />,
  },
  {
    name: "Settings",
    path: "/users/settings",
    icon: <Settings className="w-6 h-6" />,
  },
];
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="p-4 bg-[var(--color-white)] border-b flex items-center justify-between lg:hidden">
        <h1 className="text-3xl text-center font-semibold text-[var(--color-black)]">
          <span className="text-[var(--color-blue)] inline-block -rotate-15">
            G
          </span>
          early
        </h1>
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="text-black border" />
        </Button>
      </div>

      {/* Sidebar - Responsive */}
      <div
        className={`fixed inset-y-0 h-screen left-0 z-50  bg-[var(--color-white)] shadow transition-transform transform lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button for Mobile */}
        {/* <div className="flex items-center justify-between p-4 lg:hidden">
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            <X className="text-[var(--color-black)]" />
          </Button>
        </div> */}

        {/* Sidebar Content */}
        <div>
          {/* logo */}
          <div className="">
            <h1 className="text-3xl md:text-4xl text-center bg-[var(--color-bg-gray)] font-semibold py-5 px-2 text-[var(--color-black)]">
              <span className="text-[var(--color-blue)] inline-block -rotate-15">
                G
              </span>
              early
            </h1>
          </div>
          <ul className="mt-5 space-y-2">
            {sidebarItems.map((item, index) => (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "block bg-[var(--color-blue)] text-[var(--color-text)] rounded"
                    : "block"
                }
              >
                <li
                  key={index}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--color-blue)] hover:text-[var(--color-text)] cursor-pointer text-lg font-normal border "
                >
                  {item.icon}
                  <span>{item.name}</span>
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
