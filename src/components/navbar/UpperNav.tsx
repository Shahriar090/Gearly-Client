import { NavLink } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UpperNav = () => {
  return (
    <div className="bg-green-500 text-white hidden  md:flex justify-between items-center px-14 py-2">
      <div className="flex items-center gap-4 w-fit">
        {/* language and currency selector */}
        {/* language */}
        <DropdownMenu>
          <DropdownMenuTrigger>🌐Language</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Any Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>বাংলা (Bengali)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Currency */}
        <DropdownMenu>
          <DropdownMenuTrigger>$ Currency</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Any Currency</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>BDT</DropdownMenuItem>
            <DropdownMenuItem>USD</DropdownMenuItem>
            <DropdownMenuItem>Euro</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
