export type TReqReviewPost = {
  title: string;
  text: string;
};

type TReqReviewImage = {
  review: number;
  image: string | null;
};

export type TReqReviewPostMutation = TReqReviewPost & TReqReviewImage;
