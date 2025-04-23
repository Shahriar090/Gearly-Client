import { FiPhoneCall } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "@/hooks/useCart";

type TDrawerProps = {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MiddleNav = ({ setIsDrawerOpen }: TDrawerProps) => {
  const { cart } = useCart();

  return (
    <div className="w-full h-16 flex justify-between items-center px-4 md:px-14 bg-[var(--color-black)]">
      <div className="logo">
        <h1 className="text-3xl md:text-4xl font-semibold text-[var(--color-text)]">
          <span className="text-[var(--color-yellow)] inline-block -rotate-15">
            G
          </span>
          early
        </h1>
      </div>

      {/* phone and cart */}
      <div className="flex items-start gap-2">
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
  );
};

export default MiddleNav;
