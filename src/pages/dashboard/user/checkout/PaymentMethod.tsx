import { Input } from "@/components/ui/input";
import paymentImg from "../../../../assets/payment-methods.png";

const PaymentMethod = () => {
  return (
    <div className="bg-[var(--color-white)] p-2">
      <h1 className="text-sm text-[var(--color-black)] font-medium flex items-center">
        <span className="bg-[var(--color-blue)] p-2 rounded-full text-[var(--color-text)] mr-2">
          2
        </span>
        Payment Method
      </h1>
      {/* divider */}
      <div className="w-full h-0.5 bg-gray-100 my-2"></div>
      <div className="">
        <h1 className="text-sm text-[var(--color-black)] my-2 font-medium">
          Select A Payment Method
        </h1>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <Input type="radio" className="w-4 h-4" />
            <span>Cash On Delivery</span>
          </div>
          <div className="flex items-center space-x-3">
            <Input type="radio" className="w-4 h-4" />
            <span>Online Payment</span>
          </div>
          <div className="flex items-center space-x-3">
            <Input type="radio" className="w-4 h-4" />
            <span>POS On Delivery</span>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-sm text-[var(--color-black)] font-medium block mb-1">
            {" "}
            We Accept:
          </span>{" "}
          <img src={paymentImg} alt="Payment Image" />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
