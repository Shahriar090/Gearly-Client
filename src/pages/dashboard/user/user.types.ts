type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TUserProfile = {
  _id: string;
  name: TUserName;
  gender: string;
  age: number;
  contactNo: string;
  address: string;
  email: string;
  profileImage: string;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
