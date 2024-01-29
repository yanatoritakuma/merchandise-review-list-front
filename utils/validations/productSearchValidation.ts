import validator from "validator";
import { Validation } from "@/utils/validations/validation";

type TConditions = {
  min: string;
  max: string;
};

export const ProductSearchValidation = () => {
  const { required, number, bigger, smaller } = Validation();

  const productSearchValidation = (conditions: TConditions, text: string) => {
    // 必須チェック
    if (required(text, "商品検索")) {
      return false;
    }

    // スペース削除
    if (
      validator.isEmpty(conditions.min) &&
      validator.isEmpty(conditions.max)
    ) {
      return true;
    }

    // 半角数字チェック
    if (
      number(String(conditions.min), "最小価格") ||
      number(String(conditions.max), "最大価格")
    ) {
      return false;
    }
    // 比較チェック
    if (
      bigger(String(conditions.min), "最小価格", 1, 99999999) ||
      bigger(String(conditions.max), "最大価格", 1, 99999999)
    ) {
      return false;
    }

    // より小さい比較チェック
    if (
      smaller(
        Number(conditions.min),
        Number(conditions.max),
        "最小価格",
        "最大価格"
      )
    ) {
      return false;
    }

    return true;
  };

  return { productSearchValidation };
};
