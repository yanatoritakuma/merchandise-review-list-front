import { Validation } from "@/utils/validations/validation";

export const HouseholdBudgetValidation = () => {
  const { required } = Validation();

  const householdBudgetValidation = (title: string) => {
    // 必須チェック
    if (required(title, "タイトル")) {
      return false;
    }

    return true;
  };

  return { householdBudgetValidation };
};
