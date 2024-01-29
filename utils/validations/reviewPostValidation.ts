import { TReqReviewPost } from "@/types/reviewPost";
import { Validation } from "@/utils/validations/validation";

export const ReviewPostValidation = () => {
  const { required, below, japaneseProhibited } = Validation();

  const reviewPostValid = (
    reviewPost: TReqReviewPost,
    photoUrl: File | null
  ) => {
    // 必須チェック
    if (
      required(reviewPost.title, "タイトル") ||
      required(reviewPost.text, "内容") ||
      required(reviewPost.category, "カテゴリー")
    ) {
      return false;
    }

    // 以下チェック
    if (
      below(reviewPost.title, "タイトル", 50) ||
      below(reviewPost.text, "内容", 150) ||
      below(reviewPost.category, "カテゴリー", 30)
    ) {
      return false;
    }

    // 画像URLに日本語が入っていないかチェック
    if (japaneseProhibited(photoUrl)) {
      return false;
    }

    return true;
  };

  return { reviewPostValid };
};
