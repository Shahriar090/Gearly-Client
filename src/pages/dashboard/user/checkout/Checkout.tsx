import CustomerInfo from "./CustomerInfo";
import Heading from "./Heading";
import PaymentMethod from "./PaymentMethod";
import DeliveryMethod from "./DeliveryMethod";
import CouponAndVoucher from "./CouponAndVoucher";
import OrderOverview from "./OrderOverview";

const Checkout = () => {
  return (
    <div className="space-y-8 bg-[var(--color-bg-gray)]">
      {/* Heading remains above the grid for all devices */}
      <Heading />

      {/* Main grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column - Customer Information (Full width on mobile, 1/3 on desktop) */}
        <div className="lg:col-span-1">
          <CustomerInfo />
        </div>

        {/* Right Column - Payment, Delivery, Coupons, Order Overview (Full width on mobile, 2/3 on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment and Delivery - side by side on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PaymentMethod />
            <DeliveryMethod />
          </div>

          {/* Coupon and Voucher - full width */}
          <CouponAndVoucher />

          {/* Order Overview */}
          <OrderOverview />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
