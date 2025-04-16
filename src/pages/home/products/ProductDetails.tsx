import { useParams } from "react-router";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import DeliveryOptions from "./DeliveryOptions";
import Specifications from "./Specifications";
import Descriptions from "./Descriptions";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import { TProduct, TSpecifications } from "./products.types";
import ProductHeader from "./ProductHeader";
import Reviews from "./reviews/Reviews";

const ProductDetails = () => {
  const [product, setProduct] = useState<TProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>("");
  const { id } = useParams();
  const { api } = useAxios();
  // fetch product data
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `${import.meta.env.VITE_LOCAL_SERVER_URL}/products/${id}`
        );
        setProduct(response.data?.data);
      } catch (error) {
        setError("Failed To Fetch Product Data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [api, id]);

  // loading and error handling
  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  // transforming specifications object into array of object before sending it to Specifications component. {}

  const transformedSpecifications: TSpecifications[] = Object.entries(
    product?.specifications || {}
  ).map(([key, value], index) => {
    return {
      _id: String(index), //temporary unique key for each item.
      name: key,
      value: value,
    };
  });
  return (
    <div className="wrapper bg-white">
      {/* header */}
      <div className="p-4">
        <ProductHeader />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 p-4 shadow">
        <ProductImage productImages={product && product.images} />
        {product && <ProductInfo product={product} />}
        <DeliveryOptions />
      </div>
      <div className="grid grid-cols-1 gap-3 p-4">
        <Specifications specifications={transformedSpecifications} />
        {product && <Descriptions description={product?.description} />}
        {product && <Reviews product={product} />}
      </div>
    </div>
  );
};

export default ProductDetails;
