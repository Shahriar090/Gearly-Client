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
import { useState } from "react";

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<TCheckoutFormValues>();
  const { handleSubmit } = methods;
  const { cart } = useCart();
  const { api } = useAxios();

  const onSubmit = async (data: TCheckoutFormValues) => {
    setIsLoading(true);
    const payload = {
      items: cart?.items?.map((item) => ({
        product:
          typeof item.product === "string" ? item.product : item.product?._id, //checking if the product is a string (_id) or entire product object.
        quantity: item.quantity,
      })),
      customerInfo: data.customerInfo,
      paymentMethod: data.paymentMethod,
    };

    try {
      // step - 1 create the order
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/orders/create-order`,
        {
          order: payload,
        }
      );
      const trackingId = response.data?.data?.trackingId;
      const totalAmount = response.data?.data?.grandTotal;

      // step - 2 checking payment method
      if (data.paymentMethod === "Online Payment") {
        const paymentResponse = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/payment/init`,
          {
            trackingId,
            totalAmount,
            customerInfo: data.customerInfo,
            products: cart?.items,
            deliveryMethod: data.deliveryMethod,
          }
        );

        // window.location.replace(paymentResponse.data?.data?.gatewayUrl);
        window.location.href = paymentResponse.data?.data?.gatewayUrl;
      } else if (data.paymentMethod === "Cash On Delivery") {
        toast.success("Your Order Has Been Placed Successfully", {
          duration: 3000,
          position: "top-right",
        });
        window.location.href = "/users/payment-success";
      }
    } catch (error) {
      console.error("Order Failed", error);
      toast.success("Failed To Place Order", {
        duration: 3000,
        position: "top-right",
      });
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[var(--color-bg-gray)] p-5"
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
        <div className="flex justify-end mt-4 md:mt-0">
          <Button
            type="submit"
            className="w-full md:w-fit"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Pay Now"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Checkout;
