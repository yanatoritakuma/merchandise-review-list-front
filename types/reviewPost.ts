export type TReqReviewPost = {
  id?: number;
  title: string;
  text: string;
  category: string;
};

type TReqReviewImage = {
  review: number;
  image: string | null;
};

export type TReqReviewPostMutation = TReqReviewPost & TReqReviewImage;

export type TResReviewPost = {
  reviewPosts: TReviewPosts[];
  totalPageCount: number;
};

export type TReviewPosts = {
  id: number;
  title: string;
  text: string;
  category: string;
  image: string;
  review: number;
  reviewPostUserResponse: {
    id: number;
    name: string;
    image: string;
  };
  user_id: number;
  like_count: number;
  like_id: number;
  like_post_user_id: number;
  created_at: string;
};
