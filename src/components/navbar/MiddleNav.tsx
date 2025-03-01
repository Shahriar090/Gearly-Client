import { FaShoppingCart } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";

type TDrawerProps = {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MiddleNav = ({ setIsDrawerOpen }: TDrawerProps) => {
  return (
    <div className="w-full h-24 flex justify-between items-center px-4 md:px-14 bg-gray-100">
      <div className="logo">
        <h1 className="text-3xl md:text-5xl font-semibold text-black">
          <span className="text-green-500 inline-block -rotate-15">G</span>
          early
        </h1>
      </div>

      {/* phone and cart */}
      <div className="flex items-start gap-2">
        <div>
          <div className="flex items-center gap-2">
            <FiPhoneCall className="h-5 w-5" />
            <span className="font-semibold text-black">Call Us Now</span>
          </div>
          <span className="text-xs md:text-lg">Toll Free : 0123456789</span>
        </div>
        <div className="cart">
          <FaShoppingCart className="h-6 w-6 text-green-500" />
        </div>
        {/* Menu Button for Mobile */}
        <button className="md:hidden" onClick={() => setIsDrawerOpen(true)}>
          <CiMenuKebab className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default MiddleNav;
