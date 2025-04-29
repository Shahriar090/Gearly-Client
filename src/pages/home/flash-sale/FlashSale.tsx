import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Timer from "./Timer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { TFlashSaleItem } from "@/pages/dashboard/admin/flash-sales/flashSales.types";
import useAxios from "@/hooks/useAxios";
import { Link } from "react-router";

const FlashSale = () => {
  const [flashSales, setFlashSales] = useState<TFlashSaleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { api } = useAxios();

  // fetch flash sales
  useEffect(() => {
    const fetchFlashSales = async () => {
      try {
        setLoading(true);
        const response = await api.get<{ data: TFlashSaleItem[] }>(
          `${import.meta.env.VITE_SERVER_LOCAL_URL}/flash-sales`
        );

        setFlashSales(response.data?.data || []);
      } catch (error) {
        setError("Failed To Fetch Flash Sales");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlashSales();
  }, [api]);
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
            <Link to="/all-flash-sales">
              <Button className="bg-[var(--color-blue)]">
                Shop All Products
              </Button>
            </Link>
          </div>
        </div>
        {/* divider div */}
        <div className="w-full h-0.5 bg-gray-100 mt-2"></div>

        {/* products */}
        {loading ? (
          <div className="p-4">Loading Flash Sales...</div>
        ) : error ? (
          <div className="p-4 text-red-500">{error}</div>
        ) : flashSales.length === 0 ? (
          <div className="p-4">No Flash Sales Available</div>
        ) : (
          <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 mt-4 p-4">
            {flashSales.slice(0, 6).map((item) => (
              <Link to={`product/${item.product._id}`}>
                <Card
                  key={item._id}
                  className="relative p-4 cursor-pointer shadow-none md:border-none md:hover:shadow-md transition-all duration-500"
                >
                  <Badge className="absolute top-2 right-2 bg-[var(--color-blue)] text-[var(--color-text)]">
                    -{item.discount}%
                  </Badge>

                  <img
                    src={item.product.images?.[0]}
                    alt={item.product.modelName}
                    className="w-full h-32 mx-auto"
                  />

                  <div className="flex flex-col items-start gap-1">
                    <h3 className="text-sm font-medium line-clamp-1 text-[var(--color-black)]">
                      {item.product.modelName}
                    </h3>
                    <span className="text-sm font-medium text-[var(--color-blue)]">
                      $
                      {(
                        item.product.price -
                        (item.product.price * item.discount) / 100
                      ).toFixed(2)}
                    </span>

                    <span className="text-sm line-through text-[var(--color-red)]">
                      ${item.product.price}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashSale;
