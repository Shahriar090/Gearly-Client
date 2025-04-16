import {
  CircleAlert,
  HandCoins,
  MapPinHouse,
  Rotate3D,
  ShieldOff,
  Truck,
} from "lucide-react";

const DeliveryOptions = () => {
  return (
    <div className="w-full bg-white p-4 shadow">
      {/* section head */}
      <div className="flex justify-between items-center my-4 px-6">
        <h3 className="text-sm text-[var(--color-gray)] font-medium">
          Delivery Options
        </h3>
        <CircleAlert size={15} className="text-[var(--color-gray)]" />
      </div>

      {/* delivery details */}
      <div className="space-y-4">
        {/* address */}
        <div className="flex justify-between items-center px-6">
          <div className="flex items-center gap-1">
            <MapPinHouse size={20} className="text-[var(--color-gray)]" />
            <h3 className="text-sm font-medium">
              Dhaka, Dhaka North Banani Road No. 12 - 19
            </h3>
          </div>
          <span className="text-[var(--color-blue)] text-sm">Change</span>
        </div>

        {/* divider div */}
        <div className="w-full h-0.5 bg-gray-100/50"></div>

        {/* date and delivery charge */}
        <div className="flex justify-between items-center px-6">
          <div>
            <div className="flex items-center gap-1">
              <Truck size={20} className="text-[var(--color-gray)]" />
              <p className="text-sm font-medium">Standard Delivery</p>
            </div>
            <span className="text-sm text-[var(--color-gray)]">
              Guaranteed By 14-17 Apr
            </span>
          </div>
          <div className="">
            <span className="text-black">$40</span>
          </div>
        </div>

        <div className="flex items-center gap-1 px-6">
          <HandCoins size={20} className="text-[var(--color-gray)]" />
          <p className="text-sm font-medium">Cash On Delivery Available</p>
        </div>
        {/* divider div */}
        <div className="w-full h-0.5 bg-gray-100/50"></div>
      </div>

      {/* return and warranty */}
      <div className="space-y-4">
        <div className="flex justify-between items-center my-4 px-6">
          <p className="text-sm text-[var(--color-gray)] font-medium">
            Return & Warranty
          </p>
          <CircleAlert size={15} className="text-[var(--color-gray)]" />
        </div>
        <div className="flex items-center gap-1 px-6">
          <Rotate3D size={20} className="text-[var(--color-gray)]" />
          <p className="text-sm font-medium">7 Days Returns</p>
        </div>
        <div className="flex items-center gap-1 px-6">
          <ShieldOff size={20} className="text-[var(--color-gray)]" />
          <p className="text-sm font-medium">Warranty Not Available</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptions;
