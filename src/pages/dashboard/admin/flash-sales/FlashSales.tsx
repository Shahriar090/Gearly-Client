import { useCallback, useEffect, useState } from "react";
import {
  TCreateFlashSalePayload,
  TFlashSaleItem,
  TLoadingState,
  TProduct,
} from "./flashSales.types";
import useAxios from "@/hooks/useAxios";
import FlashSalesHeader from "./FlashSalesHeader";
import { Button } from "@/components/ui/button";
import FlashSalesList from "./FlashSalesList";
import CreateFlashSaleForm from "./CreateFlashSaleForm";

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

  // fetch all products for create flash sale form

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading((prev) => ({ ...prev, products: true }));

        const response = await api.get<{ data: { products: TProduct[] } }>(
          `${import.meta.env.VITE_SERVER_BASE_URL}/products`
        );
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

  // fetch all flash sales data with useCallback
  const fetchAllFlashSales = useCallback(async (): Promise<void> => {
    try {
      setLoading((prev) => ({ ...prev, flashSales: true }));

      const response = await api.get<{ data: TFlashSaleItem[] }>(
        `${import.meta.env.VITE_SERVER_BASE_URL}/flash-sales`
      );
      setFlashSales(response.data?.data || []);
    } catch (error) {
      setError("Failed To Fetch Flash Sales");
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, flashSales: false }));
    }
  }, [api, setLoading, setFlashSales, setError]);

  // initial fetch of flash sales
  useEffect(() => {
    fetchAllFlashSales();
  }, [fetchAllFlashSales]);

  // handle create flash sale
  const handleCreateFlashSale = async (
    newSale: TCreateFlashSalePayload
  ): Promise<void> => {
    try {
      setLoading((prev) => ({ ...prev, flashSales: true }));

      await api.post(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/flash-sales/create-flash-sales`,
        newSale
      );

      // refresh the flash sales list after new flash sale item added
      await fetchAllFlashSales();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed To Create Flash Sale";
      setError(errorMessage);
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, flashSales: false }));
    }
  };

  // handle delete flash sale
  const handleDeleteFlashSale = async (id: string): Promise<void> => {
    try {
      setLoading((prev) => ({ ...prev, flashSales: true }));

      await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/flash-sales/delete/${id}`
      );

      // refresh the list after deletion
      await fetchAllFlashSales();
    } catch (error) {
      setError("Failed To Delete Flash Sale");
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
          <Button
            onClick={() => setError(null)}
            className="float-right font-bold"
          >
            X
          </Button>
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
          onDelete={handleDeleteFlashSale}
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
