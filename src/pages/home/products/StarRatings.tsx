import { Star } from "lucide-react";
import { TStarRating } from "./products.types";

const StarRatings = ({ averageRating, showLabel = true }: TStarRating) => {
  const totalStars = 5;

  // if avg rating is 3.6 then Math.floor(3.6)= 3
  const fullStars = Math.floor(averageRating);

  // show half star only when decimal part is at least 0.5 or more. (3.6 - 3 = 0.6 (true)). Meaning should show 1 half star
  const hasHalfStar = averageRating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-1 text-[var(--color-yellow)]">
      {/* looping over an array of length 5. Each i in the index of the star */}
      {[...Array(totalStars)].map((_, i) => {
        if (i < fullStars) {
          // full star
          return <Star size={20} key={i} />;
        } else if (i === fullStars && hasHalfStar) {
          // half star
          return (
            <div key={i} className="relative w-4 h-4">
              <Star
                size={20}
                className="absolute left-0 top-0 text-[var(--color-yellow)]"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
              <Star size={20} className="absolute left-0 to-0 text-gray-300" />
            </div>
          );
        } else {
          // empty star
          return <Star size={20} key={i} className="text-gray-300" />;
        }
      })}

      {showLabel && (
        <span className="text-xs text-gray-600 ml-2">
          Average Rating:{" "}
          <span className="text-[var(--color-black)] font-semibold text-sm">
            {averageRating}
          </span>
          <span className="text-[var(--color-gray)]">/5</span>
        </span>
      )}
    </div>
  );
};

export default StarRatings;
