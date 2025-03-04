import { NavLink } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { navItems } from "./NavItems";
import Language from "./Language";
import Currency from "./Currency";
import AuthInfo from "./AuthInfo";
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
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-semibold text-black">
            <span className="text-green-500 inline-block -rotate-15">G</span>
            early
          </h1>
          {/* Close Button */}
          <button className="" onClick={() => setIsOpen(false)}>
            <IoIosCloseCircleOutline className="w-8 h-8 text-black" />
          </button>
        </div>

        {/* Language and Currency (from UpperNav) */}
        <div className="flex flex-wrap gap-2 items-center bg-green-500 rounded-sm">
          <Language />
          <Currency />
          <AuthInfo />
        </div>

        {/* Navigation Links (from LowerNav) */}
        <div className="mt-3">
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
        </div>

        {/* Search Form (from LowerNav) */}
        <form className="mt-auto">
          <div className="flex w-full max-w-xl items-center space-x-2">
            <Input type="text" placeholder="Search Products..." />
            <Button type="submit" variant="default" className="bg-green-500">
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MobileDrawer;
