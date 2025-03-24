export type TProduct = {
  _id: string;
  modelName: string;
  brandName: string;
  price: number;
  availabilityStatus: string;
  stock: number;
  category: {
    _id: string;
    name: string;
  };
  brand: string;
  discountPrice: number;
  averageRating: number;
  reviews: [
    {
      _id: string;
      user: string;
      product: string;
      rating: number;
      comment: string;
    }
  ];
  images: string[];
};
