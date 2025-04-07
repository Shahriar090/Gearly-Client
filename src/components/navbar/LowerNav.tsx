import { NavLink } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { navItems } from "./NavItems";

const LowerNav = () => {
  return (
    <div className="w-full bg-[var(--color-yellow)] h-12 hidden md:block">
      <div className="items flex flex-col md:flex-row gap-3 md:gap-0 justify-between h-full items-center w-full max-w-screen-xl mx-auto bg-[var(--color-blue)] p-4">
        <ul className="flex gap-3 items-center">
          {navItems.map((item) => (
            <li key={item.path} className="group">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-1 transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--color-yellow)] font-bold"
                      : "text-[var(--color-text)]"
                  } group-hover:text-[var(--color-black)]`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <form>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Search Products..." />
            <Button
              type="submit"
              className="bg-[var(--color-yellow)] text-[var(--color-black)] hover:text-[var(--color-text)]"
            >
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LowerNav;
