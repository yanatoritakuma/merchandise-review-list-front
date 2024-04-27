import { TReqMoneyManagementMutation } from "@/types/moneyManagement";
import { Validation } from "@/utils/validations/validation";

export const MoneyManagementValidation = () => {
  const { required, number, below } = Validation();

  const moneyManagementRegisterValidation = (
    reqMoneyManagementMutation: TReqMoneyManagementMutation
  ) => {
    // 必須チェック
    if (
      required(reqMoneyManagementMutation.title, "商品名") ||
      required(reqMoneyManagementMutation.category, "カテゴリー") ||
      required(String(reqMoneyManagementMutation.quantity), "個数") ||
      required(String(reqMoneyManagementMutation.unit_price), "値段") ||
      required(String(reqMoneyManagementMutation.total_price), "合計金額")
    ) {
      return false;
    }

    // 英数字チェック
    if (number(String(reqMoneyManagementMutation.total_price), "値段")) {
      return false;
    }

    // 以下チェック
    if (below(reqMoneyManagementMutation.title, "商品名", 50)) {
      return false;
    }

    return true;
  };

  return {
    moneyManagementRegisterValidation,
  };
};
