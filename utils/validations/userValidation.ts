"use client";
import { useContext } from "react";
import { MessageContext } from "@/app/provider/messageProvider";
import validator from "validator";

type TReqUpDate = {
  email: string;
  name: string;
};

export const UserValidation = () => {
  const { message, setMessage } = useContext(MessageContext);

  const accountRegisterValidation = (
    photoUrl: File | null,
    register?: TReqUpDate
  ) => {
    const containsJapanese = (fileName: string) => {
      const japaneseRegex =
        /[一-龠々〆ヵヶぁ-ゔゞァ-・ヽヾ゛゜ー「」｢｣()〔〕［］｛｝〈〉《》【】〖〗〘〙〚〛〜～]/;
      return japaneseRegex.test(fileName);
    };

    if (register && validator.isEmpty(register.email)) {
      return setMessage({
        ...message,
        text: "メールアドレスは必須です。",
        type: "error",
      });
    } else if (register && !validator.isEmail(register.email)) {
      return setMessage({
        ...message,
        text: "メールアドレスの形式が正しくありません。",
        type: "error",
      });
    } else if (register && validator.isEmpty(register.name)) {
      return setMessage({
        ...message,
        text: "名前は必須です。",
        type: "error",
      });
    } else if (register && !validator.isLength(register.name, { max: 30 })) {
      return setMessage({
        ...message,
        text: "名前は30文字以下で入力してください。",
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

  return { accountRegisterValidation };
};
