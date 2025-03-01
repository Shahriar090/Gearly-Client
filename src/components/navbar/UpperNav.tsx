import { NavLink } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Language from "./Language";
import Currency from "./Currency";

const UpperNav = () => {
  return (
    <div className="bg-green-500 text-white hidden  md:flex justify-between items-center px-14 py-2">
      <div className="flex items-center gap-4 w-fit">
        {/* language and currency selector */}
        {/* language */}
        <Language />
        {/* Currency */}
        <Currency />
      </div>

      {/* account wishlist and checkout */}
      <div className="flex items-center gap-4">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>My Account</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <NavLink to="/register">Register</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <NavLink to="/login">Login</NavLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* wish list */}
        <div>
          <p>Wish List</p>
        </div>
        {/* checkout */}
        <div>
          <p>Checkout</p>
        </div>
      </div>
    </div>
  );
};

export default UpperNav;
