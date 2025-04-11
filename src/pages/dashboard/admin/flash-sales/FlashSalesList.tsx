import { Card } from "@/components/ui/card";
import { TFlashSalesListProps } from "./flashSales.types";
import { Badge } from "@/components/ui/badge";
import { Clock, Pen, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

const FlashSalesList = ({ sales, onEdit, onDelete }: TFlashSalesListProps) => {
  if (!sales || sales.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No Flash Sale Products Available
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sales.map((sale) => {
        // convert start and end time strings to Date objects to compare with the current date

        const startDate = new Date(sale.startTime);
        const endDate = new Date(sale.endTime);
        const now = new Date();
        const isActive = startDate <= now && endDate >= now;

        return (
          <Card key={sale._id} className="p-4 space-y-3">
            {/* product image */}
            {sale.product.images?.[0] && (
              <img
                src={sale.product.images[0]}
                alt={sale.product.modelName}
                className="h-40 w-full object-cover rounded-md"
              />
            )}

            {/* product info */}

            <h3 className="font-bold text-lg">{sale.product.modelName}</h3>

            {/* price and discount */}

            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">
                ${(sale.product.price * (1 - sale.discount / 100)).toFixed(2)}
              </span>

              <span className="text-sm line-through text-gray-500">
                ${sale.product.price.toFixed(2)}
              </span>

              <Badge variant="destructive" className="ml-auto">
                -{sale.discount}%
              </Badge>
            </div>

            {/* sale period */}
            <div className="text-sm space-y-2">
              <Badge variant={isActive ? "default" : "secondary"}>
                {isActive ? "Active" : startDate > now ? "Upcoming" : "Ended"}
              </Badge>

              {/* converting js date object into human readable string format */}
              <p>
                <Clock className="h-5 w-5 text-black" /> Starts:{" "}
                {startDate.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p>
                <Clock className="h-5 w-5 text-black" /> Ends:{" "}
                {endDate.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* actions */}
            <div className="flex gap-2 pt-2">
              <Button size="sm" onClick={() => onEdit(sale)}>
                <Pen /> Edit
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(sale._id)}
              >
                <Trash /> Delete
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default FlashSalesList;
