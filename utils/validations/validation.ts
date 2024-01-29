import { useContext } from "react";
import { MessageContext } from "@/provider/messageProvider";
import validator from "validator";

export const Validation = () => {
  const { message, setMessage } = useContext(MessageContext);

  // 必須チェック
  const required = (checkText: string, messages: string) => {
    const trimmedText = checkText.trim();
    if (validator.isEmpty(trimmedText)) {
      setMessage({
        ...message,
        text: `${messages}は必須です。`,
        type: "error",
      });
      return true;
    } else {
      return false;
    }
  };

  // 半角数字チェック
  const number = (checkText: string, messages: string) => {
    if (!validator.isNumeric(checkText)) {
      setMessage({
        ...message,
        text: `${messages}には半角数字を入力してください。`,
        type: "error",
      });
      return true;
    } else {
      return false;
    }
  };

  // 比較チェック
  const bigger = (
    checkText: string,
    messages: string,
    min: number,
    max: number
  ) => {
    if (!validator.isInt(String(checkText), { min, max })) {
      setMessage({
        ...message,
        text: `${messages}は${min.toLocaleString()}より大きく${max.toLocaleString()}未満の整数で入力してください。`,
        type: "error",
      });
      return true;
    } else {
      return false;
    }
  };

  // より小さい比較チェック
  const smaller = (
    checkNum1: number,
    checkNum2: number,
    messages1: string,
    messages2: string
  ) => {
    if (Number(checkNum1) > Number(checkNum2)) {
      setMessage({
        ...message,
        text: `${messages1}は${messages2}より小さい価格で入力してください。`,
        type: "error",
      });
      return true;
    } else {
      return false;
    }
  };

  //   画像URLに日本語が入っていないかチェック
  const japaneseProhibited = (photoUrl: File | null) => {
    const containsJapanese = (fileName: string) => {
      const japaneseRegex =
        /[一-龠々〆ヵヶぁ-ゔゞァ-・ヽヾ゛゜ー「」｢｣()〔〕［］｛｝〈〉《》【】〖〗〘〙〚〛〜～]/;
      return japaneseRegex.test(fileName);
    };

    if (photoUrl && containsJapanese(photoUrl.name)) {
      setMessage({
        ...message,
        text: "画像名に日本語を入れないでください。",
        type: "error",
      });
      return true;
    } else {
      return false;
    }
  };

  // 以下チェック
  const below = (checkText: string, messages: string, max: number) => {
    if (!validator.isLength(checkText, { max })) {
      setMessage({
        ...message,
        text: `${messages}は${max}文字以下で入力してください。`,
        type: "error",
      });
      return true;
    } else {
      return false;
    }
  };

  //   メールアドレスの形式チェック
  const emailFormat = (email: string) => {
    if (!validator.isEmail(email)) {
      setMessage({
        ...message,
        text: "メールアドレスの形式が正しくありません。",
        type: "error",
      });
      return true;
    } else {
      return false;
    }
  };

  return {
    required,
    number,
    bigger,
    smaller,
    japaneseProhibited,
    below,
    emailFormat,
  };
};
