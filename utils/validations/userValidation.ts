import { Validation } from "@/utils/validations/validation";

type TReqUpDate = {
  email: string;
  name: string;
};

export const UserValidation = () => {
  const { required, emailFormat, below, japaneseProhibited } = Validation();

  const accountRegisterValidation = (
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

  return { accountRegisterValidation };
};
