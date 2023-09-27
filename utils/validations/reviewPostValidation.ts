import { useContext } from "react";
import { MessageContext } from "@/provider/messageProvider";
import validator from "validator";
import { TReqReviewPost } from "@/types/reviewPost";

export const ReviewPostValidation = () => {
  const { message, setMessage } = useContext(MessageContext);

  const reviewPostValid = (
    reviewPost: TReqReviewPost,
    photoUrl: File | null
  ) => {
    const containsJapanese = (fileName: string) => {
      const japaneseRegex =
        /[一-龠々〆ヵヶぁ-ゔゞァ-・ヽヾ゛゜ー「」｢｣()〔〕［］｛｝〈〉《》【】〖〗〘〙〚〛〜～]/;
      return japaneseRegex.test(fileName);
    };

    if (validator.isEmpty(reviewPost.title)) {
      return setMessage({
        ...message,
        text: "タイトルは必須です。",
        type: "error",
      });
    } else if (!validator.isLength(reviewPost.title, { max: 50 })) {
      return setMessage({
        ...message,
        text: "タイトルは50文字以下で入力してください。",
        type: "error",
      });
    } else if (validator.isEmpty(reviewPost.text)) {
      return setMessage({
        ...message,
        text: "内容は必須です。",
        type: "error",
      });
    } else if (!validator.isLength(reviewPost.text, { max: 150 })) {
      return setMessage({
        ...message,
        text: "内容は150文字以下で入力してください。",
        type: "error",
      });
    } else if (photoUrl && containsJapanese(photoUrl.name)) {
      return setMessage({
        ...message,
        text: "画像名に日本語を入れないでください。",
        type: "error",
      });
    } else {
      return true;
    }
  };

  return { reviewPostValid };
};
