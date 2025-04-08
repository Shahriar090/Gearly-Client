import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { TBestSellingProduct } from "./bestSellingType";

const ProductCard = ({ product }: { product: TBestSellingProduct }) => {
  return (
    <Card className="p-4 text-center relative shadow-none cursor-pointer hover:bg-gray-100 h-full flex flex-col">
      {product.discount > 0 && (
        <Badge className="absolute top-2 left-2 bg-[var(--color-blue)] text-[var(--color-text)]">
          -{product.discount}%
        </Badge>
      )}

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-cover mb-3"
      />

      {/* Spacer to push the bottom section down */}
      {/* <div className="flex-grow"></div> */}

      {/* Price Section */}
      <div>
        <div className="flex flex-col items-start gap-1">
          {/* Product Name: This ensures all names take up equal space */}
          <h3 className="text-sm font-semibold flex-grow flex items-center justify-center">
            {product.name}
          </h3>
          <span className="text-sm font-semibold text-[var(--color-blue)]">
            ${product.price - (product.price * product.discount) / 100}
          </span>
          {product.discount > 0 && (
            <span className="text-sm line-through text-[var(--color-red)]">
              ${product.price}
            </span>
          )}
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-start mt-1 space-x-1">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              size={16}
              className={
                index < product.rating
                  ? "text-[var(--color-yellow)]"
                  : "text-gray-300"
              }
            />
          ))}
          <span className="text-xs text-gray-600">
            ({product.reviews} reviews)
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
