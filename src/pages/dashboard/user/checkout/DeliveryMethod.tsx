import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const DeliveryMethod = () => {
  const { register } = useFormContext();
  return (
    <div className="bg-[var(--color-white)] p-2">
      <h1 className="text-sm text-[var(--color-black)] font-medium flex items-center">
        <span className="bg-[var(--color-blue)] p-2 rounded-full text-[var(--color-text)] mr-2">
          2
        </span>
        Delivery Method
      </h1>
      {/* divider */}
      <div className="w-full h-0.5 bg-gray-100 my-2"></div>
      <div className="">
        <h1 className="text-sm text-[var(--color-black)] my-2 font-medium">
          Select A Delivery Method
        </h1>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <Input
              value="Home Delivery"
              {...register("deliveryMethod")}
              type="radio"
              className="w-4 h-4"
            />
            <span>Home Delivery - $30</span>
          </div>
          <div className="flex items-center space-x-3">
            <Input
              value="Store Pickup"
              {...register("deliveryMethod")}
              type="radio"
              className="w-4 h-4"
            />
            <span>Store Pickup - $00</span>
          </div>
          <div className="flex items-center space-x-3">
            <Input value="Request Express" type="radio" className="w-4 h-4" />
            <span>Request Express - Charge Applicable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMethod;
