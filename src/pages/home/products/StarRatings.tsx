import { Star } from "lucide-react";

const StarRatings = ({ averageRating }: { averageRating: number }) => {
  const totalStars = 5;
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-1 text-yellow-400 text-lg">
      {[...Array(totalStars)].map((_, i) => {
        if (i < fullStars) {
          // Full star
          return <Star size={20} key={i} fill="currentColor" stroke="none" />;
        } else if (i === fullStars && hasHalfStar) {
          // Half star
          return (
            <div key={i} className="relative w-4 h-4">
              <Star
                size={20}
                className="absolute left-0 top-0 text-yellow-400"
                fill="currentColor"
                stroke="none"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
              <Star
                size={20}
                className="absolute left-0 top-0 text-gray-300"
                fill="currentColor"
                stroke="none"
              />
            </div>
          );
        } else {
          // Empty star
          return <Star size={20} key={i} className="text-gray-300" />;
        }
      })}
      <span className="text-sm text-gray-600 ml-2">({averageRating})</span>
    </div>
  );
};

export default StarRatings;
