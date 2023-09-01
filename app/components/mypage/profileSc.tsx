"use client";

import "@/style/auth/auth.scss";
import { ButtonBox } from "@/app/components/elements/buttonBox";

export default function ProfileSc() {
  const onClickGetUser = async () => {
    // const headers = await createHeaders();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: "GET",
      // headers: headers,
      cache: "no-store",
      credentials: "include",
    });
    console.log("res", res);
  };
  return (
    <section className="authInputBox">
      <h2>クライアントコンポーネント</h2>
      <ButtonBox onClick={() => onClickGetUser()}>ユーザー情報取得</ButtonBox>
    </section>
  );
}
