import { TReqBudget } from "@/types/budget";
import { Validation } from "@/utils/validations/validation";

export const BudgetValidation = () => {
  const { required, number } = Validation();

  const budgetValidation = (reqBudget: TReqBudget) => {
    // 必須チェック
    if (required(reqBudget.year, "年") || required(reqBudget.month, "月")) {
      return false;
    }

    // 半角数字チェック
    if (
      number(String(reqBudget.food), "食品") ||
      number(String(reqBudget.drink), "飲料水") ||
      number(String(reqBudget.book), "本") ||
      number(String(reqBudget.fashion), "ファッション") ||
      number(String(reqBudget.furniture), "家具") ||
      number(String(reqBudget.games_toys), "ゲーム・おもちゃ") ||
      number(String(reqBudget.beauty), "美容") ||
      number(String(reqBudget.every_day_items), "日用品") ||
      number(String(reqBudget.other), "その他")
    ) {
      return false;
    }

    return true;
  };

  return { budgetValidation };
};
