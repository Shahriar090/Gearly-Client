import Language from "./Language";
import Currency from "./Currency";
import AuthInfo from "./AuthInfo";

const UpperNav = () => {
  return (
    <div className="bg-[var(--color-blue)] hidden  md:flex justify-between items-center px-14 py-1 w-full h-10">
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
          <AuthInfo />
        </div>

        {/* wish list */}
        <div>
          <p className="text-[var(--color-text)] font-medium">Wish List</p>
        </div>
        {/* checkout */}
        <div>
          <p className="text-[var(--color-text)] font-medium">Checkout</p>
        </div>
      </div>
    </div>
  );
};

export default UpperNav;
