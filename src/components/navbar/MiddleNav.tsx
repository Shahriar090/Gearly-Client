import { FaShoppingCart } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
const MiddleNav = () => {
  return (
    <div className="w-full h-24 flex justify-between items-center px-14 bg-gray-100">
      <div className="logo">
        <h1 className="text-5xl font-semibold text-black">
          <span className="text-green-500">G</span>early
        </h1>
      </div>

      {/* phone and cart */}
      <div className="flex items-start gap-5">
        <div>
          <div className="flex items-center gap-2">
            <FiPhoneCall className="h-5 w-5" />
            <span className="font-semibold text-black">Call Us Now</span>
          </div>
          <span>Toll Free : 0123456789</span>
        </div>
        <div className="cart">
          <FaShoppingCart className="h-6 w-6 text-green-500" />
        </div>
      </div>
    </div>
  );
};

export default MiddleNav;
