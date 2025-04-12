import { useParams } from "react-router";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import DeliveryOptions from "./DeliveryOptions";
import Specifications from "./Specifications";
import Descriptions from "./Descriptions";
import Reviews from "./Reviews";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>("");
  const { id } = useParams();
  const { api } = useAxios();
  // console.log(product);
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
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-5  border">
        <ProductImage productImages={product && product.images} />
        <ProductInfo />
        <DeliveryOptions />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <Specifications />
        <Descriptions />
        <Reviews />
      </div>
    </div>
  );
};

export default ProductDetails;
