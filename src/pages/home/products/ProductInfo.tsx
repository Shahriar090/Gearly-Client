import { Heart, PackageCheck, CheckCircle, XCircle } from "lucide-react";
import ProductActions from "./ProductActions";
import StarRatings from "./StarRatings";
import { TProduct } from "./products.types";

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
    <div className="p-6 space-y-4 bg-gray-200">
      {/* Product Name */}
      <h1 className="text-2xl font-bold">{modelName}</h1>

      {/* Ratings */}
      <StarRatings averageRating={averageRating} />

      {/* Brand */}
      <h3 className="text-sm text-gray-500">
        <span className="font-medium text-gray-700">Brand: </span>
        {brandName || "No Brand"}
      </h3>

      {/* Pricing */}
      <div className="space-y-1">
        <div className="flex items-center text-xl font-semibold text-green-600">
          <span>${discountPrice}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 line-through">
          <p>${price}</p>
          <p className="text-red-500 font-medium">-{discount}%</p>
        </div>
      </div>

      {/* Saved Info */}
      <div className="flex items-center text-sm text-gray-600 gap-1">
        <Heart className="w-4 h-4 text-pink-500" />
        <span>You saved ${saved}</span>
      </div>

      {/* Stock Info */}
      <div className="flex items-center text-sm text-gray-600 gap-1">
        <PackageCheck className="w-4 h-4 text-blue-500" />
        <span>{availabilityStatus}</span>
      </div>

      {/* Availability Status */}
      <div className="flex items-center text-sm text-gray-600 gap-1">
        {availabilityStatus === "In Stock" ? (
          <>
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Available</span>
          </>
        ) : (
          <>
            <XCircle className="w-4 h-4 text-red-500" />
            <span>Not Available</span>
          </>
        )}
      </div>

      {/* Actions */}
      <ProductActions />
    </div>
  );
};

export default ProductInfo;
