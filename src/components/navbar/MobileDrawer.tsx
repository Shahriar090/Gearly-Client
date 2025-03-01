import { NavLink } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { navItems } from "./NavItems";
import Language from "./Language";
import Currency from "./Currency";
type TDrawerProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileDrawer = ({ isOpen, setIsOpen }: TDrawerProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 bg-black  bg-opacity-50 transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } md:hidden`}
    >
      {/* Sidebar */}
      <div className="w-full max-w-full h-full bg-white shadow-lg flex flex-col p-4">
        {/* Close Button */}
        <button className="ml-auto mb-4" onClick={() => setIsOpen(false)}>
          <IoIosCloseCircleOutline className="w-8 h-8 text-red-500" />
        </button>

        {/* Language and Currency (from UpperNav) */}
        <div className="flex gap-2 ">
          <Language />
          <Currency />
        </div>

        {/* Navigation Links (from LowerNav) */}
        <ul className="flex flex-col gap-3 py-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-1 ${
                    isActive ? "text-green-500 font-bold" : "text-black"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Search Form (from LowerNav) */}
        <form className="mt-auto">
          <div className="flex w-full max-w-xl items-center space-x-2">
            <Input type="text" placeholder="Search Products..." />
            <Button type="submit" variant="default">
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MobileDrawer;
