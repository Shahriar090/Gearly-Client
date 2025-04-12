import { DollarSign, Star } from "lucide-react";
import ProductActions from "./ProductActions";

const ProductInfo = () => {
  return (
    <div className="p-6 rounded-xl max-w-lg space-y-4 bg-gray-200">
      {/* Product Name */}
      <h1 className="text-2xl font-bold">Apple AirPods Pro 2nd Gen</h1>

      {/* Ratings */}
      <div className="flex items-center gap-1 text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill="currentColor" stroke="none" />
        ))}
        <span className="text-gray-600 text-sm ml-2">(245 ratings)</span>
      </div>

      {/* Brand */}
      <h3 className="text-sm text-gray-500">
        <span className="font-medium text-gray-700">Brand:</span> Apple || No
        Brand
      </h3>

      {/* Pricing */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xl font-semibold text-green-600">
          <DollarSign size={20} />
          <span>$199.99</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 line-through">
          <p>$249.99</p>
          <p className="text-red-500 font-medium">(-20%)</p>
        </div>
      </div>

      {/* Actions */}
      <ProductActions />
    </div>
  );
};

export default ProductInfo;
