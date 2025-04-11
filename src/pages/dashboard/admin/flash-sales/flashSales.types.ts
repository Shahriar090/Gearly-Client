export type TProduct = {
  _id: string;
  modelName: string;
  price: number;
  images?: string[];
  category?: string;
};

export type TFlashSaleItem = {
  _id: string;
  productId: string;
  product: TProduct;
  discount: number;
  startTime: string;
  endTime: string;
  flashSaleDiscountedPrice?: number;
};

export type TCreateFlashSalePayload = {
  startTime: string;
  endTime: string;
  flashSales: Array<{
    productId: string;
    discount: number;
  }>;
};

export type TLoadingState = {
  products: boolean;
  flashSales: boolean;
};

export type TFlashSaleProductCardProps = {
  _id: string;
  product: TProduct;
  discount: number;
  startTime: string;
  endTime: string;
  flashSaleDiscountedPrice?: number;
};

export type TFlashSalesListProps = {
  sales?: TFlashSaleItem[];
  onEdit: (sale: TFlashSaleItem) => void;
  onDelete: (id: string) => void;
};

export type TFlashSaleProductSelection = {
  productId: string;
  discount: number;
};

export type TCreateFlashSaleFromProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (payload: {
    startTime: string;
    endTime: string;
    flashSales: TFlashSaleProductSelection[];
  }) => void;
  products: { _id: string; modelName: string }[];
  loading?: boolean;
};

export type TFlashSalesHeaderProps = {
  onAddClick: () => void;
};
