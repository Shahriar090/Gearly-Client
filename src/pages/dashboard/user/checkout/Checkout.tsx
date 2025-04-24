import CustomerInfo from "./CustomerInfo";
import Heading from "./Heading";
import PaymentMethod from "./PaymentMethod";
import DeliveryMethod from "./DeliveryMethod";
import CouponAndVoucher from "./CouponAndVoucher";
import OrderOverview from "./OrderOverview";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { FormProvider, useForm } from "react-hook-form";
import { TCheckoutFormValues } from "./checkout.types";
import useAxios from "@/hooks/useAxios";
import { toast } from "sonner";

const Checkout = () => {
  const methods = useForm<TCheckoutFormValues>();
  const { handleSubmit } = methods;
  const { cart } = useCart();
  const { api } = useAxios();

  const onSubmit = async (data: TCheckoutFormValues) => {
    console.log("Form submitted with data:", data);
    const payload = {
      items: cart?.items?.map((item) => ({
        product:
          typeof item.product === "string" ? item.product : item.product?._id,
        quantity: item.quantity,
      })),
      customerInfo: data.customerInfo,
      paymentMethod: data.paymentMethod,
    };

    console.log("Payload to create order:", payload);

    try {
      // Step - 1: Create the order
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/orders/create-order`,
        { order: payload }
      );

      console.log("Order creation response:", response);

      const trackingId = response.data?.data?.trackingId;
      const totalAmount = response.data?.data?.grandTotal;

      if (!trackingId || !totalAmount) {
        console.error(
          "Missing trackingId or totalAmount from order creation response"
        );
        toast.error("Failed to create order. Missing data.");
        return;
      }

      // Step - 2: Initiate payment
      const paymentPayload = {
        trackingId,
        totalAmount,
        customerInfo: data.customerInfo,
        products: cart?.items,
        deliveryMethod: data.deliveryMethod,
      };

      console.log("Payment initiation payload:", paymentPayload);

      const paymentResponse = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/payment/init`,
        paymentPayload
      );

      console.log("Payment initiation response:", paymentResponse);

      const gatewayUrl = paymentResponse.data?.data?.gatewayUrl;
      if (!gatewayUrl) {
        console.error("Payment gateway URL not found in response");
        toast.error("Payment gateway URL missing. Try again.");
        return;
      }

      console.log("Redirecting to payment gateway URL:", gatewayUrl);
      window.location.replace(gatewayUrl);
    } catch (error) {
      console.error("Error during checkout process:", error);
      toast.error("Failed To Place Order", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 bg-[var(--color-bg-gray)]"
      >
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
        <div className="flex justify-end mt-5">
          <Button type="submit">Pay Now</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Checkout;
