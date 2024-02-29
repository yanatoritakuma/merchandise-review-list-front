import { useContext } from "react";
import { MessageContext } from "@/provider/messageProvider";
import validator from "validator";
import dayjs, { Dayjs } from "dayjs";

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

  // 半角英数字チェック
  const alphanumeric = (checkText: string, messages: string) => {
    if (!validator.isAlphanumeric(checkText)) {
      setMessage({
        ...message,
        text: `${messages}には半角英数字を入力してください。`,
        type: "error",
      });
      return true;
    } else {
      return false;
    }
  };

  // 整数の比較チェック
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

  // 半角英数字の比較チェック
  const alphanumericComparison = (
    checkText: string,
    messages: string,
    min: number,
    max: number
  ) => {
    if (
      validator.isAlphanumeric(checkText) &&
      !validator.isLength(String(checkText), { min, max })
    ) {
      setMessage({
        ...message,
        text: `${messages}は${min.toLocaleString()}文字より大きく${max.toLocaleString()}文字未満の半角英数字で入力してください。`,
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

  // 過去の日付かチェック
  const pastDate = (date: Dayjs | null, messages: string) => {
    if (date === null) {
      setMessage({
        ...message,
        text: `${messages}を入力してください。`,
        type: "error",
      });
      return true;
    }

    // 現在の日時を取得
    const currentDate = dayjs();

    if (date.isBefore(currentDate)) {
      setMessage({
        ...message,
        text: `${messages}は過去の日付を設定できません。`,
        type: "error",
      });
      return true;
    } else {
      return false;
    }
  };

  // 2099年より過去の日付かチェック
  const beforeDate = (date: Dayjs | null, messages: string) => {
    if (date === null) {
      setMessage({
        ...message,
        text: `${messages}を入力してください。`,
        type: "error",
      });
      return true;
    }

    // 指定された日付が2099年より過去の場合はエラー
    if (date.isAfter(dayjs("2099-12-31"))) {
      setMessage({
        ...message,
        text: `${messages}は2099年より未来の日付を設定できません。`,
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
    alphanumeric,
    bigger,
    alphanumericComparison,
    smaller,
    japaneseProhibited,
    below,
    emailFormat,
    pastDate,
    beforeDate,
  };
};
