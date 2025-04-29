import { useState } from "react";
import { TAddReview } from "../products.types";
import useAxios from "@/hooks/useAxios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

const AddReview = ({ open, onClose, product }: TAddReview) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { api } = useAxios();

  const handleSubmit = async () => {
    try {
      await api.post(
        `${import.meta.env.VITE_SERVER_LOCAL_URL}/reviews/create-review/${
          product._id
        }`,
        { review: { rating, comment } }
      );
      toast.success("Review Added Successfully", {
        position: "top-right",
        duration: 3000,
      });
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    }
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write A Review For {product.modelName}</DialogTitle>
        </DialogHeader>
        <div>
          <Label>Your Rating</Label>
          <div className="flex gap-1 text-2xl items-center">
            {[...Array(5)].map((_, index) => {
              return (
                <Button
                  variant="outline"
                  key={index}
                  type="button"
                  onClick={() => setRating(index + 1)}
                  className={
                    index < rating
                      ? "text-[var(--color-yellow)]"
                      : "text-[var(--color-gray)]"
                  }
                >
                  <Star size={20} />
                </Button>
              );
            })}
          </div>
        </div>

        <div>
          <Label>Your Review:</Label>

          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write Your Feedback Here"
          />
        </div>

        <Button onClick={handleSubmit}>Submit Review</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddReview;
