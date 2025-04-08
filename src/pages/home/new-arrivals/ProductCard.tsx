import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Eye, Heart, Star } from "lucide-react";
import { TNewArrivals } from "./newArrivalsTypes";

const ProductCard = ({ product }: { product: TNewArrivals }) => {
  return (
    <Card
      key={product.id}
      className="relative group p-4 text-center shadow-none border h-full flex flex-col cursor-pointer"
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <Badge className="absolute top-2 left-2 bg-[var(--color-blue)] text-[var(--color-text)]">
          -{product.discount}%
        </Badge>
      )}

      <div className="absolute md:hidden md:group-hover:block right-2 top-2 space-y-1">
        <div>
          <Heart className="h-8 w-8 bg-[var(--color-text)] p-2 rounded-full" />
        </div>
        <div>
          <Eye className="h-8 w-8 bg-[var(--color-text)] p-2 rounded-full" />
        </div>
      </div>

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 mb-3"
      />

      {/* Spacer */}
      {/* <div className="flex-grow"></div> */}

      {/* Price Section */}
      <div>
        <div className="flex flex-col text-start gap-1">
          {/* Product Name */}
          <h3
            className="text-sm font-semibold line-clamp-1"
            title={product.name}
          >
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
        <div className="flex items-center justify-start mt-2 space-x-1">
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
