import { NavLink } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const LowerNav = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Specials", path: "/specials" },
    { name: "Brands", path: "/brands" },
    { name: "Contact", path: "/contact" },
    { name: "Blogs", path: "/blogs" },
  ];
  return (
    <div className="w-full bg-green-500 h-full md:h-16">
      <div className="items flex flex-col md:flex-row gap-3 md:gap0 justify-between h-full items-center w-full max-w-screen-xl mx-auto bg-black text-white p-4">
        <ul className="flex gap-3 items-center">
          {navItems.map((item) => (
            <li key={item.path} className="group">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-1 transition-colors duration-200 ${
                    isActive ? "text-green-500 font-bold" : "text-white"
                  } group-hover:text-green-500`
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
            <Button type="submit">Search</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LowerNav;
