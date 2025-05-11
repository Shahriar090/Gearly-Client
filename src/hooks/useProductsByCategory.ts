import { Location, NavigateFunction } from "react-router";
import useAxios from "./useAxios";
import { useEffect, useState } from "react";
import { TProduct } from "@/pages/home/products/products.types";
import { debounce } from "lodash";

type TSortType = "price-low-to-high" | "price-high-to-low" | "default";

type TUseProductsProps = {
  slug?: string;
  limitFromQuery: number;
  sortFromQuery: TSortType;
  minPriceFromQuery: number;
  maxPriceFromQuery: number;
  brandFromQuery: string;
  location: Location;
  navigate: NavigateFunction;
};

const useProductsByCategory = ({
  slug,
  limitFromQuery,
  sortFromQuery,
  minPriceFromQuery,
  maxPriceFromQuery,
  brandFromQuery,
  location,
  navigate,
}: TUseProductsProps) => {
  const { api } = useAxios();
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [limit, setLimit] = useState(limitFromQuery);
  const [sort, setSort] = useState<TSortType>(sortFromQuery);
  const [minPrice, setMinPrice] = useState(minPriceFromQuery);
  const [maxPrice, setMaxPrice] = useState(maxPriceFromQuery);
  const [selectedBrand, setSelectedBrand] = useState(brandFromQuery);

  const [tempMinPrice, setTempMinPrice] = useState(minPriceFromQuery);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPriceFromQuery);
  // ------------------------------------------
  // Temporary states for price inputs (e.g., sliders or text fields).
  // These allow users to adjust price filters without immediately triggering an API call or URL update.
  // Once the user stops changing the values (debounced), the actual minPrice and maxPrice are updated.
  // -----------------------------------------
  //   debounce price update

  useEffect(() => {
    const debounceApplyPrice = debounce(() => {
      if (tempMinPrice >= tempMaxPrice) return;

      setMinPrice(tempMinPrice);
      setMaxPrice(tempMaxPrice);

      //   creating a URLSearchParams object from current URL's query string.
      const query = new URLSearchParams(location.search);

      query.set("minPrice", tempMinPrice.toString());
      query.set("maxPrice", tempMaxPrice.toString());
      navigate(`${location.pathname}?${query.toString()}`, { replace: true });
    }, 1000);
    debounceApplyPrice();

    return () => debounceApplyPrice.cancel();
  }, [
    location.pathname,
    location.search,
    navigate,
    tempMinPrice,
    tempMaxPrice,
  ]);

  // fetching products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const sortQuery =
          sort === "price-low-to-high"
            ? "price"
            : sort === "price-high-to-low"
            ? "-price"
            : "createdAt";

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: any = {
          limit,
          sort: sortQuery,
          category: slug,
          "price[gte]": minPrice,
          "price[lte]": maxPrice,
        };
        if (selectedBrand) {
          params.brandName = selectedBrand;
        }

        const { data } = await api.get(
          `${import.meta.env.VITE_SERVER_LOCAL_URL}/products/category/${slug}`,
          { params }
        );
        setProducts(data?.data || []);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message || "Failed To Fetch Products");
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProducts();
  }, [api, limit, maxPrice, minPrice, selectedBrand, slug, sort]);

  // limit change handler
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    const query = new URLSearchParams(location.search);
    query.set("limit", newLimit.toString());
    navigate(`${location.pathname}?${query.toString()}`);
  };

  // sort change handler
  const handleSortChange = (newSort: TSortType) => {
    setSort(newSort);
    const query = new URLSearchParams(location.search);
    query.set("sort", newSort);
    navigate(`${location.pathname}?${query.toString()}`);
  };

  // brand change handler
  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    const query = new URLSearchParams(location.search);
    query.set("brandName", brand);
    navigate(`${location.pathname}?${query.toString()}`);
  };

  return {
    products,
    loading,
    error,
    sort,
    limit,
    minPrice,
    maxPrice,
    tempMinPrice,
    tempMaxPrice,
    selectedBrand,
    setTempMinPrice,
    setTempMaxPrice,
    handleLimitChange,
    handleSortChange,
    handleBrandChange,
  };
};

export default useProductsByCategory;
