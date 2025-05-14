import { useEffect, useState } from "react";
import useAxios from "./useAxios";

const useBrandsByCategory = (slug?: string) => {
  const { api } = useAxios();
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      if (!slug) return;

      const { data } = await api.get(
        `${
          import.meta.env.VITE_SERVER_LOCAL_URL
        }/sub-categories/sub-category-by-category?category=${slug}`
      );
      setBrands(data?.data || []);
    };
    fetchBrands();
  }, [api, slug]);
  return brands;
};

export default useBrandsByCategory;
