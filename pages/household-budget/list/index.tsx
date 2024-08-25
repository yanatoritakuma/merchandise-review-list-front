import { useQueryUser } from "@/hooks/user/useQueryUser";
import { css } from "@emotion/react";
import Link from "next/link";

const Index = () => {
  const { data: user } = useQueryUser();

  return (
    <main css={householdBudget}>
      {user !== undefined ? (
        <>
          <h1>家計簿List</h1>
        </>
      ) : (
        <>
          <p>未ログインでは、家計簿を作成できません。</p>
          <Link href="/auth">ログイン画面へ</Link>
        </>
      )}
    </main>
  );
};

export default Index;

const householdBudget = css`
  width: 100%;
  max-width: 1440px;
  margin: 60px auto;
  padding: 20px;

  h1 {
    text-align: center;
  }
`;
