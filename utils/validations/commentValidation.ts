import { Validation } from "@/utils/validations/validation";

export const CommentValidation = () => {
  const { required } = Validation();

  const commentValidation = (comment: string) => {
    // 必須チェック
    if (required(comment, "コメント")) {
      return false;
    }

    return true;
  };

  return { commentValidation };
};
