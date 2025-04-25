import paymentSuccessImg from "../../../../../src/assets/payment-success.jpg";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";

const PaymentSuccess = () => {
  const { tranId } = useParams();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-white)] p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <img
            src={paymentSuccessImg}
            alt="Payment Successful"
            className="w-44 h-44 object-cover rounded-full shadow-md"
          />
        </div>
        <div className="flex items-center justify-center text-green-600 mb-3">
          <CheckCircle size={40} />
        </div>
        <h1 className="text-2xl font-semibold text-[var(--color-black)] mb-2">
          Payment Successful!
        </h1>
        <span className="my-2 text-[var(--color-black)]">
          {tranId ? (
            <>Tracking Id: {tranId}</>
          ) : (
            <>
              <p>Order Confirmed With Cash On Delivery</p>
            </>
          )}
        </span>
        <p className="text-[var(--color-gray)] mb-6">
          Thank you for your payment. A confirmation email has been sent to you.
        </p>
        <Button
          className="w-full text-[var(--color-text)] bg-[var(--color-blue)] transition"
          onClick={() => (window.location.href = "/")}
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
