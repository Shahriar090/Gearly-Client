import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import React, { useState } from "react";
import {
  TCreateFlashSaleFromProps,
  TFlashSaleProductSelection,
} from "./flashSales.types";

const CreateFlashSaleForm = ({
  open,
  setOpen,
  onSubmit,
  products,
  loading,
}: TCreateFlashSaleFromProps) => {
  const [selectedProducts, setSelectedProducts] = useState<
    TFlashSaleProductSelection[]
  >([]);
  const [currentProduct, setCurrentProduct] = useState<string>("");
  const [discount, setDiscount] = useState("");
  const [startTime, setStartTime] = useState<Date | undefined>();
  const [endTime, setEndTime] = useState<Date | undefined>();

  const handleAddProduct = (): void => {
    if (currentProduct && discount) {
      setSelectedProducts([
        ...selectedProducts,
        {
          productId: currentProduct,
          discount: Number(discount),
        },
      ]);
      setCurrentProduct("");
      setDiscount("");
    }
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(
      selectedProducts.filter((p) => p.productId !== productId)
    );
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!startTime || !endTime || selectedProducts.length === 0) {
      alert("Please fill all fields");
      return;
    }

    // Format dates to DD/MM/YYYY
    const formatDate = (date: Date): string => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const payload = {
      startTime: formatDate(startTime),
      endTime: formatDate(endTime),
      flashSales: selectedProducts,
    };

    onSubmit(payload);
    setOpen(false);
  };

  // Type the calendar disabled functions
  const isStartDateDisabled = (date: Date): boolean => date < new Date();
  const isEndDateDisabled = (date: Date): boolean =>
    !startTime || date < startTime;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-[500px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Flash Sale</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label>Add Products</label>
            <div className="flex gap-2">
              <Select value={currentProduct} onValueChange={setCurrentProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product._id} value={product._id}>
                      {product.modelName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <input
                type="number"
                placeholder="Discount %"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="border p-2 rounded"
              />

              <Button
                type="button"
                onClick={handleAddProduct}
                disabled={!currentProduct || !discount}
              >
                Add
              </Button>
            </div>

            {/* Selected products list */}
            <div className="space-y-2">
              {selectedProducts.map((item) => {
                const product = products.find((p) => p._id === item.productId);
                return (
                  <div
                    key={item.productId}
                    className="flex justify-between items-center p-2 border rounded"
                  >
                    <span>
                      {product?.modelName} - {item.discount}% off
                    </span>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveProduct(item.productId)}
                    >
                      Remove
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label>Start Time</label>
            <Calendar
              mode="single"
              selected={startTime}
              onSelect={setStartTime}
              disabled={isStartDateDisabled}
            />
          </div>

          <div className="space-y-2">
            <label>End Time</label>
            <Calendar
              mode="single"
              selected={endTime}
              onSelect={setEndTime}
              disabled={isEndDateDisabled}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : " Create Flash Sale"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFlashSaleForm;
