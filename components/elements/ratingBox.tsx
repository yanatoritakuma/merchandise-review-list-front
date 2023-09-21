import { memo } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

type Props = {
  reviewState: number;
  setReviewState: React.Dispatch<React.SetStateAction<number>>;
};

export const RatingBox = memo(({ reviewState, setReviewState }: Props) => {
  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating"
        defaultValue={3}
        precision={0.5}
        value={reviewState}
        onChange={(e: any) => setReviewState(Number(e.target.value))}
      />
    </Stack>
  );
});

RatingBox.displayName = "RatingBox";
