import { Input } from "@/components/ui/input";

const PriceRange = () => {
  return (
    <div className="shadow bg-[var(--color-white)]">
      <h1 className="text-lg font-medium text-[var(--color-gray)] p-3">
        Price Range
      </h1>
      {/* divider */}
      <div className="w-full h-0.5 bg-gray-100/50"></div>
      <div className="p-3">
        {" "}
        <div className="">
          <Input type="range" className="w-[180px] shadow-none" />
        </div>
        <div className="flex items-center space-x-2">
          <Input type="text" value={0} className="w-[90px]" />
          <Input type="text" value={3000000} className="w-[90px]" />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
