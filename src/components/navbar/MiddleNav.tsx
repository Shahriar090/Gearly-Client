import { useCart } from "@/hooks/useCart";
import { ShoppingBag } from "lucide-react";
import { CiMenuKebab } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SidebarTrigger } from "../ui/sidebar";

type TDrawerProps = {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MiddleNav = ({ setIsDrawerOpen }: TDrawerProps) => {
  const { cart } = useCart();

  return (
    <>
      {" "}
      <div className="w-full h-16 flex justify-between items-center px-4 md:px-14 bg-[var(--color-black)]">
        <div className="logo">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-white" />
            <h1 className="text-3xl md:text-4xl font-semibold text-[var(--color-text)]">
              <span className="text-[var(--color-yellow)] inline-block -rotate-15">
                G
              </span>
              early
            </h1>
          </div>
        </div>

        <div className="flex items-start gap-2">
          {/* phone and cart */}
          <div>
            <div className="flex items-center gap-2">
              <FiPhoneCall className="h-5 w-5 text-[var(--color-yellow)]" />
              <span className="font-medium text-xs uppercase md:text-sm text-[var(--color-yellow)]">
                Call Us Now
              </span>
            </div>
            <span className="text-xs md:text-sm text-[var(--color-yellow)]">
              <span className="text-[var(--color-yellow)] font-medium uppercase">
                {" "}
                Toll Free
              </span>{" "}
              : 0123456789
            </span>
          </div>
          <Link to="/users/cart">
            <div className="cart relative">
              <ShoppingBag className="h-7 w-7 stroke-1 text-[var(--color-yellow)]" />
              <div className="absolute w-5 h-5 bg-[var(--color-blue)] -top-1 -right-1 rounded-full flex items-center justify-center">
                <span className=" text-[var(--color-text)] text-sm">
                  {cart?.items?.length || 0}
                </span>
              </div>
            </div>
          </Link>
          {/* Menu Button for Mobile */}
          <button className="md:hidden" onClick={() => setIsDrawerOpen(true)}>
            <CiMenuKebab className="w-6 h-6 text-[var(--color-yellow)]" />
          </button>
        </div>
      </div>
      <form>
        <div className="flex w-full items-center space-x-0 md:hidden">
          <Input
            type="text"
            placeholder="Search Products..."
            className="rounded-none"
          />
          <Button
            type="submit"
            className="bg-[var(--color-yellow)] text-[var(--color-black)] hover:text-[var(--color-text)] rounded-none"
          >
            Search
          </Button>
        </div>
      </form>
    </>
  );
};

export default MiddleNav;
