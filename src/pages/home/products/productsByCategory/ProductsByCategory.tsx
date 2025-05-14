import { Skeleton } from "@/components/ui/skeleton";
import useBrandsByCategory from "@/hooks/useBrandsByCategory";
import useProductsByCategory from "@/hooks/useProductsByCategory";
import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import PriceRange from "./productsByCategorySidebar/PriceRange";
import Brands from "./productsByCategorySidebar/Brands";
import DynamicFiltering from "./productsByCategorySidebar/DynamicFiltering";
import ProductCategoryHeader from "./ProductCategoryHeader";
import { Separator } from "@/components/ui/separator";
import ProductsByCategoryList from "./ProductsByCategoryList";

const ProductsByCategory = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // with useMemo() URLSearchParams object only recalculated when the location.search changes. if the location.search does not change between render, the previously computed URLSearchParams is reused, and avoiding unnecessary calculations.
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const limitFromQuery = Number(queryParams.get("limit") || 20);
  const sortFromQuery = (queryParams.get("sort") || "default") as
    | "price-low-to-high"
    | "price-high-to-low"
    | "default";

  const minPriceFromQuery = Number(queryParams.get("minPrice") || 0);
  const maxPriceFromQuery = Number(queryParams.get("maxPrice") || 3000000);
  const brandFromQuery = queryParams.get("brandName") || "";

  const {
    products,
    loading,
    error,
    sort,
    tempMinPrice,
    tempMaxPrice,
    selectedBrand,
    setTempMinPrice,
    setTempMaxPrice,
    handleLimitChange,
    handleSortChange,
    handleBrandChange,
  } = useProductsByCategory({
    slug,
    limitFromQuery,
    sortFromQuery,
    minPriceFromQuery,
    maxPriceFromQuery,
    brandFromQuery,
    location,
    navigate,
  });

  const brands = useBrandsByCategory(slug);

  if (loading) return <Skeleton className="w-full h-[80vh]" />;

  if (error)
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <p className="text-xl font-semibold">
          No products available in this category.
        </p>
      </div>
    );
  return (
    <section className="bg-[var(--color-bg-gray)] pt-5">
      <div className="main-container flex items-start gap-6 max-w-screen-xl mx-auto">
        {/* sidebar */}
        <aside className="w-1/5 hidden md:block space-y-6">
          <PriceRange
            minPrice={tempMinPrice}
            maxPrice={tempMaxPrice}
            setMinPrice={setTempMinPrice}
            setMaxPrice={setTempMaxPrice}
          />

          <Brands
            brands={brands}
            selectedBrand={selectedBrand}
            onBrandChange={handleBrandChange}
          />

          <DynamicFiltering products={products} />
        </aside>

        {/* products section */}
        <div className="flex-1">
          <ProductCategoryHeader
            products={products}
            onLimitChange={handleLimitChange}
            onSortChange={handleSortChange}
            currentSort={sort}
            tempMinPrice={tempMinPrice}
            tempMaxPrice={tempMaxPrice}
            setTempMinPrice={setTempMinPrice}
            setTempMaxPrice={setTempMaxPrice}
            selectedBrand={selectedBrand}
            handleBrandChange={handleBrandChange}
            brands={brands}
          />

          <Separator className="my-4" />

          {products.length === 0 ? (
            <p className="text-center">
              No Products Found! Try Different Filters.
            </p>
          ) : (
            <ProductsByCategoryList products={products} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsByCategory;
