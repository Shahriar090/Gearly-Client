export type TTopCategories = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  specifications?: {
    name: string;
    type: string;
    required: boolean;
  }[];
  isDeleted: boolean;
};
