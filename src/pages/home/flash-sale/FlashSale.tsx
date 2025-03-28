import { Button } from "@/components/ui/button";
import { flashSaleProducts } from "./flash-sale-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FlashSale = () => {
  return (
    <div className="main-container mt-16 md:mt-6 px-4">
      <h1 className="text-2xl font-semibold text-black">Flash Sale</h1>
      <div className="bg-white shadow-lg">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-green-500 font-medium text-sm">On Sell Now</h3>

          <Button variant="outline" size="sm">
            Shop All Products
          </Button>
        </div>
        {/* divider div */}
        <div className="w-full h-0.5 bg-gray-100 mt-2"></div>

        {/* products */}
        <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 mt-4 p-4">
          {flashSaleProducts.map((product) => (
            <Card
              key={product.id}
              className="relative p-4 text-center cursor-pointer"
            >
              <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                {product.discount}% OFF
              </Badge>
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 mx-auto  mb-3"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <div className="flex flex-col items-center mt-2">
                <span className="text-lg font-bold text-green-500">
                  ${product.price - (product.price * product.discount) / 100}
                </span>
                <span className="text-sm line-through text-gray-500">
                  ${product.price}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
