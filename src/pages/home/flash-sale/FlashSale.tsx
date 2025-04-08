import { flashSaleProducts } from "./flash-sale-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart } from "lucide-react";
import Timer from "./Timer";
import { Button } from "@/components/ui/button";

const FlashSale = () => {
  return (
    <div className="main-container mt-16 md:mt-6 px-4">
      <div className="bg-white">
        {/* flash sales */}
        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center md:gap-0 px-4">
          <div className="section-heading">
            {/* design div and heading */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-4 bg-[var(--color-blue)] rounded-sm"></div>
              <p className="text-sm font-semibold text-[var(--color-black)]">
                Today's
              </p>
            </div>
            <h1 className="text-xl md:text-2xl font-semibold text-[var(--color-black)] ">
              Flash Sales
            </h1>
          </div>

          {/* timer */}
          <div className="">
            <Timer endTime="2025-05-08T23:59:59" />
          </div>

          <div className="">
            <Button className="bg-[var(--color-blue)]">
              Shop All Products
            </Button>
          </div>
        </div>
        {/* divider div */}
        <div className="w-full h-0.5 bg-gray-100 mt-2"></div>

        {/* products */}
        <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 mt-4 p-4">
          {flashSaleProducts.map((product) => (
            <Card
              key={product.id}
              className="relative p-4 text-center cursor-pointer border shadow-none"
            >
              <Badge className="absolute top-2 left-2 bg-[var(--color-blue)] text-[var(--color-text)]">
                -{product.discount}%
              </Badge>
              <div className="absolute right-2 top-2 space-y-1">
                <div>
                  <Heart className="h-9 w-9 bg-[var(--color-text)] p-2 rounded-full" />
                </div>
                <div>
                  <Eye className="h-9 w-9 bg-[var(--color-text)] p-2 rounded-full" />
                </div>
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 mx-auto  mb-3"
              />
              <h3 className="text-sm font-medium">{product.name}</h3>
              <div className="flex flex-col items-center mt-2">
                <span className="text-sm font-medium text-[var(--color-blue)]">
                  ${product.price - (product.price * product.discount) / 100}
                </span>
                <span className="text-sm line-through text-[var(--color-red)]">
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
