import { useEffect, useState } from "react";

import Timer from "./Timer";
import { TFlashSaleItem } from "@/pages/dashboard/admin/flash-sales/flashSales.types";
import useAxios from "@/hooks/useAxios";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const AllFlashSales = () => {
  const [flashSales, setFlashSales] = useState<TFlashSaleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("discount-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const { api } = useAxios();

  // fetch all flash sales
  useEffect(() => {
    const fetchFlashSales = async () => {
      try {
        setLoading(true);
        const response = await api.get<{ data: TFlashSaleItem[] }>(
          `${import.meta.env.VITE_SERVER_BASE_URL}/flash-sales`
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

  // filter and sort products
  const filteredProducts = flashSales
    .filter((item) =>
      item.product.modelName
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.product.price - b.product.price;
        case "price-desc":
          return b.product.price - a.product.price;
        case "discount-asc":
          return a.discount - b.discount;
        case "discount-desc":
          return b.discount - a.discount;
        default:
          return 0;
      }
    });

  // pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage
  );
  return (
    <div className="main-container p-6">
      <div className="bg-[var(--color-white)]">
        {/* header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-black)]">
              All Flash Sales
            </h1>
            <p className="text-sm text-[var(--color-gray)]">
              Limited time offers with huge discounts
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Input
              placeholder="Search Products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="max-w-[300px]"
            />
            <Select
              value={sortOption}
              onValueChange={(value) => {
                setSortOption(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[180pxS]">
                <SelectValue
                  placeholder="
Sort By"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discount-desc">Highest Discount</SelectItem>
                <SelectItem value="discount-asc">Lowest Discount</SelectItem>
                <SelectItem value="price-desc">Highest Price</SelectItem>
                <SelectItem value="price-asc">Lowest Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* timer and status */}
        <div className="flex flex-col items-start mb-6">
          <h1 className="text-[var(--color-black)] font-semibold text-lg">
            Offer Ends In
          </h1>
          <Timer endTime="2025-05-08T23:59:59" />
        </div>

        {/* products */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="p-4 animate-pulse">
                <div className="h-48 bg-[var(--color-bg-gray)] rounded-md"></div>
                <div className="mt-4 space-y-0">
                  <div className="h-4 bg-[var(--color-bg-gray)] rounded"></div>
                  <div className="h-4 bg-[var(--color-bg-gray)] rounded w-3/4"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-[var(--color-red)]">{error}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No Flash Sale Products Found</p>
            {searchTerm && (
              <Button
                variant="ghost"
                className="mt-2"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-5">
              {paginatedProducts.map((item) => (
                <Link to={`/product/${item.product._id}`} key={item._id}>
                  <Card className="relative p-0 hover:shadow-md transition-shadow duration-300 h-full flex flex-col border shadow-none">
                    <Badge className="absolute top-3 right-3 bg-[var(--color-blue)] text-[var(--color-text)]">
                      -{item.discount}%
                    </Badge>
                    <div>
                      <img
                        src={item.product.images?.[0]}
                        alt={item.product.modelName}
                        className="w-full h-[200px] object-cover "
                      />
                    </div>

                    <div className="flex flex-col gap-1 p-2">
                      <h3 className="font-medium text-lg line-clamp-2 text-[var(--color-black)]">
                        {item.product.modelName}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[var(--color-blue)]">
                          ${item.flashSaleDiscountedPrice?.toFixed(2)}
                        </span>
                        <span className="text-sm line-through text-[var(--color-gray)]">
                          ${item.product.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-[var(--color-gray)]">
                          Ends In:{" "}
                          {new Intl.DateTimeFormat("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }).format(new Date(item.endTime))}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {/* pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      aria-disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {Array.from({ length: Math.min(totalPages, 5) }).map(
                    (_, index) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = index + 1;
                      } else if (currentPage <= 3) {
                        pageNum = index + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + index;
                      } else {
                        pageNum = currentPage - 2 + index;
                      }

                      return (
                        <PaginationItem key={index}>
                          <PaginationLink
                            isActive={currentPage === pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                  )}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      aria-disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllFlashSales;
