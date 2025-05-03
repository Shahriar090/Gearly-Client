import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { TProduct } from "../products.types";
import useAxios from "@/hooks/useAxios";
import ProductsByCategoryList from "./ProductsByCategoryList";
import ProductCategoryHeader from "./ProductCategoryHeader";

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

  const [limit, setLimit] = useState<number>(limitFromQuery);
  const [sort, setSort] = useState<
    "price-low-to-high" | "price-high-to-low" | "default"
  >(sortFromQuery);

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
        };
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_LOCAL_URL}/products/category/${slug}`,
          { params }
        );
        setProducts(response.data?.data);
        console.log(response);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error);
        console.error("Error Fetching Products By Category");
      } finally {
        setLoading(false);
      }
    };
    if (!slug) {
      return;
    }
    fetchProductsByCategory();
  }, [api, slug, limit, sort]);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    const newQueryParams = new URLSearchParams(location.search);
    newQueryParams.set("limit", newLimit.toString());
    navigate(`${location.pathname}?${newQueryParams.toString()}`);
  };

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
    <div className="main-container">
      <ProductCategoryHeader
        products={products}
        onLimitChange={handleLimitChange}
        onSortChange={handleSortChange}
        currentSort={sort}
      />
      <ProductsByCategoryList products={products} />
    </div>
  );
};

export default ProductsByCategory;
