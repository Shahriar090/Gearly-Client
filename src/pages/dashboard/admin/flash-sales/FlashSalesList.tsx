import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TFlashSalesListProps } from "./flashSales.types";

const FlashSalesList = ({ sales, onEdit, onDelete }: TFlashSalesListProps) => {
  if (!sales || sales.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No flash sale products available
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sales.map((sale) => {
        const startDate = new Date(sale.startTime);
        const endDate = new Date(sale.endTime);
        const now = new Date();
        const isActive = startDate <= now && endDate >= now;

        return (
          <Card key={sale._id} className="p-4 space-y-3">
            {/* Product Image */}
            {sale.product.images?.[0] && (
              <img
                src={sale.product.images[0]}
                alt={sale.product.modelName}
                className="h-40 w-full object-cover rounded-md"
              />
            )}

            {/* Product Info */}
            <h3 className="font-bold text-lg">{sale.product.modelName}</h3>

            {/* Price and Discount */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">
                ${(sale.product.price * (1 - sale.discount / 100)).toFixed(2)}
              </span>
              <span className="text-sm line-through text-gray-500">
                ${sale.product.price.toFixed(2)}
              </span>
              <Badge variant="destructive" className="ml-auto">
                {sale.discount}% OFF
              </Badge>
            </div>

            {/* Sale Period */}
            <div className="text-sm space-y-1">
              <Badge variant={isActive ? "default" : "secondary"}>
                {isActive ? "Active" : startDate > now ? "Upcoming" : "Ended"}
              </Badge>
              <p>🕒 Starts: {startDate.toLocaleDateString()}</p>
              <p>🕒 Ends: {endDate.toLocaleDateString()}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button size="sm" onClick={() => onEdit(sale)}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(sale._id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default FlashSalesList;
