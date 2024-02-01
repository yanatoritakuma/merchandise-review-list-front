export type TResComments = {
  commentsRes: TComments[];
};

type TComments = {
  id: number;
  text: string;
  comment_user: TCommentUser;
  user_id: number;
  created_at: string;
};

type TCommentUser = {
  id: number;
  name: string;
  image: string;
};
