export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TReviewUser = {
  _id: string;
  name: TUserName;
  gender?: string;
  profileImage?: string;
  status?: string;
};

export type TReview = {
  _id: string;
  user: TReviewUser;
  product: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

export type TSpecificationsField = {
  name: string;
  value: "string" | "number" | "boolean";
};

export type TSpecificationsGroup = {
  groupName: string;
  fields: TSpecificationsField[];
};
export type TCategory = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  specifications: TSpecificationsGroup[];

  slug: string;
};

export type TSubCategory = {
  _id: string;
  brandName: string;
  categoryName: string;
  description: string;
  imageUrl: string;
  category: string; // category id reference
  isDeleted: boolean;
  slug: string;
};

export type TProduct = {
  _id: string;
  modelName: string;
  brandName: string;
  description: string;
  price: number;
  discount: number;
  specifications: TSpecificationsGroup[];
  tags: string[];
  availabilityStatus: string;
  stock: number;
  category: TCategory;
  subCategory: TSubCategory;
  brand: string;
  images: string[];
  reviews: TReview[];
  isFeatured: boolean;
  isDeleted: boolean;
  discountPrice: number;
  saved: number;
  slug: string;
  averageRating: number;
};

export type TStarRating = {
  averageRating: number;
  showLabel?: boolean;
};

export type TAddReview = {
  open: boolean;
  onClose: () => void;
  product: TProduct;
};
