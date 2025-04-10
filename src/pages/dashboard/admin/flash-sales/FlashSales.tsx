import useAxios from "@/hooks/useAxios";
import { useEffect, useState } from "react";
import FlashSalesHeader from "./FlashSalesHeader";
import FlashSalesList from "./FlashSalesList";
import CreateFlashSaleForm from "./CreateFlashSaleForm";
import {
  TCreateFlashSalePayload,
  TFlashSaleItem,
  TLoadingState,
  TProduct,
} from "./flashSales.types";

const FlashSales = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<TProduct[]>([]);
  const [flashSales, setFlashSales] = useState<TFlashSaleItem[]>([]);
  const [loading, setLoading] = useState<TLoadingState>({
    products: false,
    flashSales: false,
  });
  const [error, setError] = useState<string | null>(null);

  const { api } = useAxios();

  // Fetch all products for the create flash sale form
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading((prev) => ({ ...prev, products: true }));
        const response = await api.get<{
          data: { products: TProduct[] };
        }>(`${import.meta.env.VITE_LOCAL_SERVER_URL}/products`);
        setProducts(response.data?.data?.products || []);
      } catch (error) {
        setError("Failed To Fetch Products");
        console.error(error);
      } finally {
        setLoading((prev) => ({ ...prev, products: false }));
      }
    };
    fetchProducts();
  }, [api]);

  // Fetch all flash sales data
  const fetchAllFlashSales = async (): Promise<void> => {
    try {
      setLoading((prev) => ({ ...prev, flashSales: true }));
      const response = await api.get<{
        data: TFlashSaleItem[];
      }>(`${import.meta.env.VITE_LOCAL_SERVER_URL}/flash-sales`);
      setFlashSales(response.data?.data || []);
    } catch (error) {
      setError("Failed To Fetch Flash Sales");
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, flashSales: false }));
    }
  };

  // Initial fetch of flash sales
  useEffect(() => {
    fetchAllFlashSales();
  }, []);

  // Handle create flash sales
  const handleCreateFlashSale = async (
    newSale: TCreateFlashSalePayload
  ): Promise<void> => {
    try {
      setLoading((prev) => ({ ...prev, flashSales: true }));
      await api.post(
        `${
          import.meta.env.VITE_LOCAL_SERVER_URL
        }/flash-sales/create-flash-sales`,
        newSale
      );
      // Refresh the flash sales list after creation
      await fetchAllFlashSales();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create flash sale";
      setError(errorMessage);
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, flashSales: false }));
    }
  };

  // Handle delete flash sale
  const handleDelete = async (id: string): Promise<void> => {
    console.log(id);
    try {
      setLoading((prev) => ({ ...prev, flashSales: true }));
      const response = await api.delete(
        `${import.meta.env.VITE_LOCAL_SERVER_URL}/flash-sales/delete/${id}`
      );

      console.log(response);
      // Refresh the list after deletion
      await fetchAllFlashSales();
    } catch (error) {
      setError("Failed to delete flash sale");
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, flashSales: false }));
    }
  };

  return (
    <div className="p-4">
      <FlashSalesHeader onAddClick={() => setOpen(true)} />

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}

      {loading.flashSales ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <FlashSalesList
          sales={flashSales}
          onEdit={() => {}}
          onDelete={handleDelete}
        />
      )}

      <CreateFlashSaleForm
        open={open}
        setOpen={setOpen}
        onSubmit={handleCreateFlashSale}
        products={products}
        loading={loading.products}
      />
    </div>
  );
};

export default FlashSales;
