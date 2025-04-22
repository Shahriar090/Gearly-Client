import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";

const CustomerInfo = () => {
  const { register, control } = useFormContext();
  return (
    <div className="bg-[var(--color-white)] p-2">
      {/* Left Column - Customer Information (Full width on mobile, 1/3 on desktop) */}
      <div className="">
        <h1 className="text-sm text-[var(--color-black)] font-medium flex items-center">
          <span className="bg-[var(--color-blue)] p-2 rounded-full text-[var(--color-text)] mr-2">
            1
          </span>
          Customer Information
        </h1>
        {/* divider */}
        <div className="w-full h-0.5 bg-gray-100 my-2"></div>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">First Name</label>
            <Input
              {...register("customerInfo.firstName")}
              type="text"
              placeholder="First Name"
            />
          </div>

          <div>
            <label className="block mb-1">Middle Name (Optional)</label>
            <Input
              {...register("customerInfo.middleName")}
              type="text"
              placeholder="Middle Name"
            />
          </div>

          <div>
            <label className="block mb-1">Last Name</label>
            <Input
              {...register("customerInfo.lastName")}
              type="text"
              placeholder="Last Name"
            />
          </div>

          <div>
            <label className="block mb-1">Address</label>
            <Input
              {...register("customerInfo.address")}
              type="text"
              placeholder="Address"
            />
          </div>

          <div>
            <label className="block mb-1">Mobile</label>
            <Input
              {...register("customerInfo.mobile")}
              type="tel"
              placeholder="Mobile Number"
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <Input
              {...register("customerInfo.email")}
              type="email"
              placeholder="Email"
            />
          </div>

          <div>
            <label className="block mb-1">City</label>
            <Input
              {...register("customerInfo.city")}
              type="text"
              placeholder="City"
            />
          </div>

          <div>
            <label className="block mb-1">Zone</label>
            <Controller
              name="customerInfo.zone"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dhaka">Dhaka City</SelectItem>
                    <SelectItem value="khulna">Khulna City</SelectItem>
                    <SelectItem value="rajshahi">Rajshahi City</SelectItem>
                    <SelectItem value="rangpur">Rangpur City</SelectItem>
                    <SelectItem value="chattogram">Chattogram City</SelectItem>
                    <SelectItem value="gazipur">Gazipur City</SelectItem>
                    <SelectItem value="mymensing">Mymensing City</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <label className="block mb-1">Additional Comments</label>
            <Textarea
              {...register("customerInfo.comment")}
              placeholder="Any special instructions?"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
