import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { TProduct } from "../products.types";
import useAxios from "@/hooks/useAxios";
import ProductsByCategoryList from "./ProductsByCategoryList";
import ProductCategoryHeader from "./ProductCategoryHeader";
import PriceRange from "./productsByCategorySidebar/PriceRange";
import { debounce } from "lodash";

// steps:
// 1 - Fetch products by category using slug (smart-phones, laptops)
// 2 - Fetch brands by its category (samsung, apple => smart-phones)
// 3 - Implement multi level filtering logic with sorting, limiting etc.

const ProductsByCategory = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams();
  const { api } = useAxios();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const limitFromQuery = Number(queryParams.get("limit") || 20);
  const sortFromQuery = (queryParams.get("sort") || "default") as
    | "price-low-to-high"
    | "price-high-to-low"
    | "default";

  const minPriceFromQuery = Number(queryParams.get("minPrice") || 0);
  const maxPriceFromQuery = Number(queryParams.get("maxPrice") || 3000000);

  const [limit, setLimit] = useState<number>(limitFromQuery);
  const [sort, setSort] = useState<
    "price-low-to-high" | "price-high-to-low" | "default"
  >(sortFromQuery);
  const [minPrice, setMinPrice] = useState<number>(minPriceFromQuery);
  const [maxPrice, setMaxPrice] = useState<number>(maxPriceFromQuery);

  // Temporary states to improve UX and prevent re-rendering on every keystroke in price range inputs.
  const [tempMinPrice, setTempMinPrice] = useState<number>(minPriceFromQuery);
  const [tempMaxPrice, setTempMaxPrice] = useState<number>(maxPriceFromQuery);

  // Debounces price filter input to avoid API calls on every keystroke.
  useEffect(() => {
    const debounceApplyPrice = debounce(() => {
      // prevent min > max
      if (tempMinPrice >= tempMaxPrice) return;

      setMinPrice(tempMinPrice);
      setMaxPrice(tempMaxPrice);

      const newQueryParams = new URLSearchParams(location.search);
      newQueryParams.set("minPrice", tempMinPrice.toString());
      newQueryParams.set("maxPrice", tempMaxPrice.toString());
      navigate(`${location.pathname}?${newQueryParams.toString()}`, {
        replace: true,
      });
    }, 3000);
    debounceApplyPrice();

    // cleanup
    return () => debounceApplyPrice.cancel();
  }, [
    location.search,
    location.pathname,
    navigate,
    tempMaxPrice,
    tempMinPrice,
  ]);

  // fetch products by category

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        // aligning with back end logic.Because it is expecting price and -price for ascending and descending

        const sortQuery =
          sort === "price-low-to-high"
            ? "price"
            : sort === "price-high-to-low"
            ? "-price"
            : "createdAt";
        const params = {
          limit,
          sort: sortQuery,
          category: slug,
          "price[gte]": minPrice,
          "price[lte]": maxPrice,
        };
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/products/category/${slug}`,
          { params }
        );
        setProducts(response.data?.data);
        console.log(response);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(
          (error && error.message) ||
            "Error Fetching Products.! Please Try Again"
        );
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (!slug) {
      return;
    }
    fetchProductsByCategory();
  }, [api, slug, limit, sort, maxPrice, minPrice]);

  // limit change handler
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    const newQueryParams = new URLSearchParams(location.search);
    newQueryParams.set("limit", newLimit.toString());
    navigate(`${location.pathname}?${newQueryParams.toString()}`);
  };

  // sorting handler
  const handleSortChange = (
    newSort: "price-low-to-high" | "price-high-to-low" | "default"
  ) => {
    setSort(newSort);
    const newQueryParams = new URLSearchParams(location.search);
    newQueryParams.set("sort", newSort);
    navigate(`${location.pathname}?${newQueryParams.toString()}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="main-container flex items-start gap-4">
      <div className="sidebar flex-1">
        <PriceRange
          minPrice={tempMinPrice}
          maxPrice={tempMaxPrice}
          setMinPrice={setTempMinPrice}
          setMaxPrice={setTempMaxPrice}
        />
      </div>
      <div className="products flex-[4]">
        <ProductCategoryHeader
          products={products}
          onLimitChange={handleLimitChange}
          onSortChange={handleSortChange}
          currentSort={sort}
        />
        {!loading && products.length === 0 ? (
          <p>No Products Found.! Please Search For Other Products</p>
        ) : (
          <ProductsByCategoryList products={products} />
        )}
      </div>
    </div>
  );
};

export default ProductsByCategory;
