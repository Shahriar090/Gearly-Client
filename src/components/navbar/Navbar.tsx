import { useState } from "react";
import LowerNav from "./LowerNav";
import MiddleNav from "./MiddleNav";
import UpperNav from "./UpperNav";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <nav className="">
      <UpperNav />
      <MiddleNav setIsDrawerOpen={setIsDrawerOpen} />
      <LowerNav />

      {/* <MobileDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} /> */}
    </nav>
  );
};

export default Navbar;
