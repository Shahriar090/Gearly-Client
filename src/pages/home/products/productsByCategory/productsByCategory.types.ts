export type TProductsByCategory = {
  _id: string;
  modelName: string;
  brandName: string;
  description: string;
  price: number;
  discount: number;
  specifications: Record<string, string | number | boolean>;
  tags: string[];
  availabilityStatus: string;
  stock: number;
  category: {
    _id: string;
    name: string;
    description: string;
    imgUrl: string;
    status: string;
    isDeleted: boolean;
    slug: string;
  };
  brand: string;
  images: string[];
  reviews?: string[];
  isFeatured: boolean;
  isDeleted: boolean;
  discountPrice: number;
  saved: number;
  slug: string;
};
