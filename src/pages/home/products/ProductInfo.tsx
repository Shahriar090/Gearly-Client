import { HandCoins } from "lucide-react";
import { TProduct } from "./products.types";
import StarRatings from "./StarRatings";
import { Badge } from "@/components/ui/badge";
import ProductActions from "./ProductActions";

const ProductInfo = ({ product }: { product: TProduct }) => {
  const {
    modelName,
    brandName,
    price,
    discount,
    discountPrice,
    saved,
    averageRating,
    availabilityStatus,
  } = product;

  return (
    <div className="w-full bg-white p-4 shadow">
      <div className="space-y-4">
        {/* product name */}
        <h1 className="text-2xl font-semibold text-[var(--color-blue)]">
          {modelName}
        </h1>

        {/* ratings */}
        <StarRatings averageRating={averageRating} />

        {/* brand */}
        <h3 className="text-sm text-[var(--color-blue)] capitalize">
          <span className="font-medium text-[var(--color-gray)]">Brand: </span>
          {brandName || "No Brand"}
        </h3>

        {/* pricing */}
        <div className="space-y-1">
          <div className="flex items-center text-xl font-semibold text-[var(--color-black)]">
            <span>${discountPrice}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--color-gray)]">
            <p className="line-through">${price}</p>
            <p className="text-[var(--color-black)] font-medium ">
              -{discount}%
            </p>
          </div>
        </div>

        {/* saved info */}
        <div className="flex items-center text-xs text-[var(--color-black)] gap-1">
          <HandCoins size={20} className="text-[var(--color-gray)]" />
          <span>You Saved ${saved}</span>
        </div>

        {/* availability status */}
        <div className="flex items-center text-sm text-[var(--color-black)] gap-1">
          Stock:{" "}
          {availabilityStatus === "In Stock" ? (
            <>
              <Badge variant="secondary" className="text-[var(--color-blue)]">
                Available
              </Badge>
            </>
          ) : (
            <>
              <Badge variant="destructive">Out Of Stock</Badge>
            </>
          )}
        </div>
      </div>

      {/* action buttons */}
      <ProductActions product={product} />
    </div>
  );
};

export default ProductInfo;
