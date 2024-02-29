import { Validation } from "@/utils/validations/validation";
import { Dayjs } from "dayjs";

export const TimeLimitValidation = () => {
  const { pastDate, beforeDate } = Validation();

  const timeLimitRegisterValidation = (date: Dayjs | null) => {
    // 過去の日付かチェック
    if (pastDate(date, "購入期日")) {
      return false;
    }

    if (beforeDate(date, "購入期日")) {
      return false;
    }

    return true;
  };

  return {
    timeLimitRegisterValidation,
  };
};
