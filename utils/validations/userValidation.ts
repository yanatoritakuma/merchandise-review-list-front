import { TRegister, TLogin } from "@/types/auth";
import { Validation } from "@/utils/validations/validation";

type TReqUpDate = {
  email: string;
  name: string;
};

export const UserValidation = () => {
  const {
    required,
    emailFormat,
    below,
    alphanumeric,
    japaneseProhibited,
    alphanumericComparison,
  } = Validation();

  const accountRegisterValidation = (register: TRegister) => {
    // 必須チェック
    if (
      required(register.email, "メールアドレス") ||
      required(register.name, "名前") ||
      required(register.password, "パスワード")
    ) {
      return false;
    }

    // 英数字チェック
    if (alphanumeric(register.password, "パスワード")) {
      return false;
    }

    // メールアドレスの形式チェック
    if (emailFormat(register.email)) {
      return false;
    }

    // 以下チェック
    if (
      below(register.name, "名前", 30) ||
      below(register.email, "メールアドレス", 30) ||
      below(register.password, "パスワード", 30)
    ) {
      return false;
    }

    if (alphanumericComparison(register.password, "パスワード", 6, 30)) {
      return false;
    }

    return true;
  };

  const loginValidation = (login: TLogin) => {
    // 必須チェック
    if (
      required(login.email, "メールアドレス") ||
      required(login.password, "パスワード")
    ) {
      return false;
    }

    // 英数字チェック
    if (alphanumeric(login.password, "パスワード")) {
      return false;
    }

    // メールアドレスの形式チェック
    if (emailFormat(login.email)) {
      return false;
    }

    // 以下チェック
    if (
      below(login.email, "メールアドレス", 30) ||
      below(login.password, "パスワード", 30)
    ) {
      return false;
    }

    if (alphanumericComparison(login.password, "パスワード", 6, 30)) {
      return false;
    }

    return true;
  };

  const accountUpdateValidation = (
    photoUrl: File | null,
    register?: TReqUpDate
  ) => {
    // 必須チェック
    if (register) {
      if (
        required(register.email, "メールアドレス") ||
        required(register.name, "名前")
      ) {
        return false;
      }
    }

    // メールアドレスの形式チェック
    if (register && emailFormat(register.email)) {
      return false;
    }

    // 以下チェック
    if (register && below(register.name, "名前", 30)) {
      return false;
    }

    // 画像URLに日本語が入っていないかチェック
    if (japaneseProhibited(photoUrl)) {
      return false;
    }

    return true;
  };

  return {
    accountUpdateValidation,
    accountRegisterValidation,
    loginValidation,
  };
};
