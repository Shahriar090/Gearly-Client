import { useParams } from "react-router";
import ProductCategoryHeader from "./ProductCategoryHeader";
import PriceRange from "./productsByCategorySidebar/PriceRange";
import Availability from "./productsByCategorySidebar/Availability";
import Brands from "./productsByCategorySidebar/Brands";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import { TProductsByCategory } from "./productsByCategory.types";
import ProductsByCategoryList from "./ProductsByCategoryList";
import { TSubCategory } from "../products.types";

const ProductsByCategory = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<TProductsByCategory[] | []>([]);
  const [filteredProducts, setFilteredProducts] = useState<
    TProductsByCategory[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const { api } = useAxios();
  const { slug } = useParams();

  // states for controlling how may products to show by user choice and sort products based on price
  const [limit, setLimit] = useState<number>(20);
  const [sort, setSort] = useState<"low-to-high" | "high-to-low" | "default">(
    "default"
  );

  // states for set price using price range component
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000000);
  // states for set brands
  const [brands, setBrands] = useState<TSubCategory[] | []>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  // fetch products
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_LOCAL_URL}/products/category/${slug}`
        );
        setProducts(response.data?.data);
      } catch (error) {
        setError("Error Fetching Products");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProductsByCategory();
    }
  }, [api, slug]);

  // fetch brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_LOCAL_URL}/sub-categories`
        );
        console.log(response.data?.data.result);
        setBrands(response.data?.data);
      } catch (error) {
        setError("Error Fetching Brands");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, [api]);

  // whenever products, limit and sort change, updated filtered products
  useEffect(() => {
    let updatedProducts = [...products];

    // filter based on min and max price
    updatedProducts = updatedProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    // filter products based on selected brand
    if (selectedBrand) {
      updatedProducts = updatedProducts.filter((product) => {
        console.log(product, "selected");
        return product.brand === selectedBrand;
      });
    }
    if (sort === "low-to-high") {
      // sort
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "high-to-low") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    // limiting
    updatedProducts = updatedProducts.slice(0, limit);
    setFilteredProducts(updatedProducts);
  }, [limit, products, sort, maxPrice, minPrice, selectedBrand]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  if (products.length === 0) return <p>No Products Found In This Category</p>;

  return (
    <div className="flex items-start gap-4">
      {/* sidebar items */}
      <div className="flex-1 space-y-4">
        <PriceRange
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
        <Availability />
        <Brands
          brands={brands}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
        />
      </div>

      {/* contents */}
      <div className="flex-[4]">
        <ProductCategoryHeader
          products={products}
          onLimitChange={setLimit}
          onSortChange={setSort}
        />
        <ProductsByCategoryList products={filteredProducts} />
      </div>
    </div>
  );
};

export default ProductsByCategory;
