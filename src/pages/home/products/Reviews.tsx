import { TReview } from "./products.types";

const Reviews = ({ reviews }: { reviews: TReview[] }) => {
  return <div>{reviews.length}</div>;
};

export default Reviews;
