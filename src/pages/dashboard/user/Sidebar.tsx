import { useState } from "react";
import {
  Menu,
  X,
  Home,
  ShoppingBag,
  Heart,
  ShoppingCart,
  User,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
const sidebarItems = [
  {
    name: "Home",
    path: "/",
    icon: <Home className="w-5 h-5" />,
  },
  {
    name: "Orders",
    path: "/users/orders",
    icon: <ShoppingBag className="w-5 h-5" />,
  },
  {
    name: "Wishlist",
    path: "/users/wishlist",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    name: "Cart",
    path: "/users/cart",
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    name: "Profile",
    path: "/users/user-profile",
    icon: <User className="w-5 h-5" />,
  },
  {
    name: "Settings",
    path: "/users/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="p-4 bg-white border-b flex items-center justify-between lg:hidden">
        <h1 className="text-3xl md:text-5xl font-semibold text-black">
          <span className="text-green-500 inline-block -rotate-15">G</span>
          early
        </h1>
        <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-6 h-6 text-black" />
        </Button>
      </div>

      {/* Sidebar - Responsive */}
      <div
        className={`fixed inset-y-0 left-0 z-50  bg-white shadow-xl text-black transition-transform transform lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button for Mobile */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h2 className="text-xl font-bold text-black">Menu</h2>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6 text-black" />
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className="p-5">
          <h1 className="text-3xl md:text-5xl font-semibold text-black">
            <span className="text-green-500 inline-block -rotate-15">G</span>
            early
          </h1>
          <ul className="mt-5 space-y-4">
            {sidebarItems.map((item, index) => (
              <Link to={item.path}>
                <li
                  key={index}
                  className="flex items-center gap-3 p-2 rounded bg-white text-black hover:bg-green-500 hover:text-white cursor-pointer"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
