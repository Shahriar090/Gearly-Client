export type TCheckoutFormValues = {
  customerInfo: {
    firstName: string;
    middleName?: string;
    lastName: string;
    address: string;
    mobile: string;
    email: string;
    city: string;
    zone: string;
    comment?: string;
  };
  paymentMethod: string;
  deliveryMethod: string;
  coupon?: string;
};
