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
  subCategory: {
    _id: string;
    brandName: string;
    categoryName: string;
    description: string;
    imageUrl: string;
    category: string;
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

export type TPriceRange = {
  minPrice: number;
  maxPrice: number;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
};

// Brands types
export type TBrandItem = {
  _id: string;
  brandName: string;
  category: string;
  categoryName: string;
  createdAt: string;
  description: string;
  imageUrl: string;
  isDeleted: boolean;
  slug: string;
};

export type TBrandResponse = {
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
  };
  result: TBrandItem[];
};

export type TBrandProps = {
  brands: TBrandResponse;
  selectedBrand: string;
  setSelectedBrand: (value: string) => void;
};
