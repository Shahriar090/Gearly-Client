import {
  CircleAlert,
  DollarSign,
  HandCoins,
  MapPinHouse,
  Rotate3D,
  ShieldOff,
  Truck,
} from "lucide-react";

const DeliveryOptions = () => {
  return (
    <div className="w-full bg-white p-4">
      {/* section head */}
      <div className="flex justify-between items-center my-4 px-6">
        <h3 className="text-sm text-gray-700 font-medium">Delivery Options</h3>
        <CircleAlert className="w-4 h-4 text-gray-700" />
      </div>

      {/* delivery details */}
      <div className="space-y-4">
        {/* address */}
        <div className="flex justify-between items-center px-6">
          <div className="flex items-center gap-1">
            <MapPinHouse className="w-5 h-5 text-gray-700" />
            <p className="text-sm font-semibold">
              Dhaka, Dhaka North Banani Road No. 12 - 19
            </p>
          </div>
          <span className="text-blue-500 text-sm">Change</span>
        </div>

        {/* divider div */}
        <div className="w-full h-0.5 bg-gray-100/50"></div>

        {/* date and delivery charge */}
        <div className="flex justify-between items-center px-6">
          <div>
            <div className="flex items-center gap-1">
              <Truck className="w-5 h-5 text-gray-700" />
              <p className="text-sm font-semibold">Standard Delivery</p>
            </div>
            <span className="text-sm text-gray-700">
              Guaranteed By 14-17 Apr
            </span>
          </div>
          <div className="flex items-center gap1">
            <DollarSign className="w-5 h-5 text-gray-700" />
            <span className="text-black">40</span>
          </div>
        </div>

        <div className="flex items-center gap-1 px-6">
          <HandCoins className="w-5 h-5 text-gray-700" />
          <p className="text-sm font-semibold">Cash On Delivery Available</p>
        </div>
        {/* divider div */}
        <div className="w-full h-0.5 bg-gray-100/50"></div>
      </div>

      {/* return and warranty */}
      <div className="space-y-4">
        <div className="flex justify-between items-center my-4 px-6">
          <p className="text-sm text-gray-700 font-medium">Return & Warranty</p>
          <CircleAlert className="w-4 h-4 text-gray-700" />
        </div>
        <div className="flex items-center gap-1 px-6">
          <Rotate3D className="w-5 h-5 text-gray-700" />
          <p className="text-sm font-semibold">7 Days Returns</p>
        </div>
        <div className="flex items-center gap-1 px-6">
          <ShieldOff className="w-5 h-5 text-gray-700" />
          <p className="text-sm font-semibold">Warranty Not Available</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptions;
