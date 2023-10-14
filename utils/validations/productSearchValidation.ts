import { useContext } from "react";
import { MessageContext } from "@/provider/messageProvider";
import validator from "validator";

type TConditions = {
  min: string;
  max: string;
};

export const ProductSearchValidation = () => {
  const { message, setMessage } = useContext(MessageContext);

  const productSearchValidation = (conditions: TConditions) => {
    if (!validator.isNumeric(String(conditions.min))) {
      return setMessage({
        ...message,
        text: "最小価格には半角数字を入力してください。",
        type: "error",
      });
    } else if (!validator.isNumeric(String(conditions.max))) {
      return setMessage({
        ...message,
        text: "最大価格には半角数字を入力してください。",
        type: "error",
      });
    } else if (
      !validator.isInt(String(conditions.min), { min: 1, max: 999999999 })
    ) {
      return setMessage({
        ...message,
        text: "最小価格は0より大きく999,999,999未満の整数で入力してください。",
        type: "error",
      });
    } else if (
      !validator.isInt(String(conditions.max), { min: 1, max: 999999999 })
    ) {
      return setMessage({
        ...message,
        text: "最大価格は0より大きく999,999,999未満の整数で入力してください。",
        type: "error",
      });
    } else if (Number(conditions.min) > Number(conditions.max)) {
      return setMessage({
        ...message,
        text: "最小価格は最大価格より小さい価格で入力してください。",
        type: "error",
      });
    } else {
      return true;
    }
  };

  return { productSearchValidation };
};
