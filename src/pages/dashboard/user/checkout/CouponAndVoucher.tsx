import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CouponAndVoucher = () => {
  return (
    <div className="space-y-4 bg-[var(--color-white)] p-4 rounded-lg">
      <h2 className="font-medium">Discount Options</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex items-center gap-2">
          <Input
            type="text"
            placeholder="Promo / Coupon Code"
            className="flex-1"
          />
          <Button variant="outline">Apply</Button>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <Input
            type="text"
            placeholder="Gift Voucher Code"
            className="flex-1"
          />
          <Button variant="outline">Apply</Button>
        </div>
      </div>
    </div>
  );
};

export default CouponAndVoucher;
