import { Calendar, Bell, MessageCircle, Menu } from "lucide-react";

type TAdminNavProps = {
  toggleSidebar: () => void;
};
const AdminNav: React.FC<TAdminNavProps> = ({ toggleSidebar }) => {
  return (
    <div className="bg-gray-800 text-white p-4 w-full fixed top-0 shadow-md flex items-center justify-between z-50">
      {/* Menu Button for Sidebar (Visible on Small Screens) */}
      <button className="md:hidden p-2" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>

      {/* Logo */}
      <div className="text-xl font-bold">AdminPanel</div>

      {/* Search Bar (Hidden on Small Screens) */}
      <div className="flex-grow mx-4 max-w-lg hidden md:block">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded hover:bg-gray-700">
          <Calendar size={24} />
        </button>
        <button className="p-2 rounded hover:bg-gray-700">
          <Bell size={24} />
        </button>
        <button className="p-2 rounded hover:bg-gray-700">
          <MessageCircle size={24} />
        </button>
      </div>
    </div>
  );
};

export default AdminNav;
