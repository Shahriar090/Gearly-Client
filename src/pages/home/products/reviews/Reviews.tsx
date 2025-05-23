import { Button } from "@/components/ui/button";
import { TProduct, TReview } from "../products.types";
import StarRatings from "../StarRatings";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import AddReview from "./AddReview";

const Reviews = ({ product }: { product: TProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { auth } = useAuth();

  const handleWriteReview = () => {
    if (!auth.user || !auth.accessToken) {
      toast.error("You Need To Login First To Write A Review", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    setIsModalOpen(true);
  };
  return (
    <div className="bg-white p-4 shadow">
      <div className="flex items-center justify-between">
        {/* rating and reviews */}
        <div className="space-y-4">
          <h1 className="text-xl font-medium text-[var(--color-black)]">
            Reviews ({product.reviews.length})
          </h1>
          <p className="text-sm text-[var(--color-black)]">
            Get specific details about this product from customer who own it.
          </p>
          <div className="total-rating">
            <StarRatings averageRating={product.averageRating} />
          </div>
        </div>
        {/* add review button */}
        <div className="">
          <Button
            onClick={handleWriteReview}
            variant="outline"
            className="border-[var(--color-blue)] text-[var(--color-blue)]"
          >
            Write A Review
          </Button>
        </div>
      </div>
      {/* divider div */}
      <div className="w-full h-0.5 bg-gray-100/50 my-4"></div>
      {/* user reviews */}
      <div className="">
        {product.reviews.map((review: TReview) => {
          const formattedDate = new Date(review.createdAt).toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          );

          return (
            <div key={review._id} className="space-y-4">
              <StarRatings averageRating={review.rating} showLabel={false} />
              <p className="text-sm text-[var(--color-black)]">
                {review.comment}
              </p>
              <p className="text-xs text-[var(--color-gray)] mt-1 space-x-4">
                By{" "}
                <span className="text-[var(--color-blue)] font-semibold">
                  {review.user.name.firstName}
                  {review.user.name.middleName
                    ? `${review.user.name.middleName} `
                    : ""}
                  {review.user.name.lastName}
                </span>
                <span className="space-x-1">On {formattedDate}</span>
              </p>
              {/* divider div */}
              <div className="w-full h-0.5 bg-gray-100/50 my-2"></div>
            </div>
          );
        })}
      </div>
      {/* modal */}
      <AddReview
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </div>
  );
};

export default Reviews;
