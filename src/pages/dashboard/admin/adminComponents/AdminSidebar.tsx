import {
  X,
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  Settings,
  Home,
  Ratio,
} from "lucide-react";
import { Link } from "react-router";

type TAdminSidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const adminSidebarOptions = [
  {
    name: "Home",
    path: "/",
    icon: <Home size={20} />,
  },
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Analytics",
    path: "/admin/analytics",
    icon: <BarChart3 size={20} />,
  },
  {
    name: "Total Orders",
    path: "/admin/total-orders",
    icon: <ShoppingCart size={20} />,
  },
  {
    name: "Customers",
    path: "/admin/total-customers",
    icon: <Users size={20} />,
  },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: <Ratio size={20} />,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: <Package size={20} />,
  },
  {
    name: "Sales",
    path: "/admin/total-sales",
    icon: <DollarSign size={20} />,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: <Settings size={20} />,
  },
];

const AdminSidebar: React.FC<TAdminSidebarProps> = ({
  isOpen,
  toggleSidebar,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 p-5 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:w-64`}
    >
      {/* Close Button for Mobile */}
      <button className="md:hidden mb-4" onClick={toggleSidebar}>
        <X size={24} />
      </button>

      {/* Sidebar Menu */}
      <ul className="space-y-4 mt-20">
        {adminSidebarOptions.map((item, index) => (
          <Link to={item.path}>
            <li
              key={index}
              className="flex items-center gap-3 p-2 rounded bg-gray-900 text-white hover:bg-gray-700 hover:text-white cursor-pointer"
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
