import { ButtonBox } from "@/components/elements/buttonBox";
import { ModalCreateHouseholdBudget } from "@/components/household-budget/ModalCreateHouseholdBudget";
import { useQueryUser } from "@/hooks/user/useQueryUser";
import { css } from "@emotion/react";
import Link from "next/link";
import { useState } from "react";

const Index = () => {
  const { data: user } = useQueryUser();
  const [openCreateHouseholdBudget, setOpenCreateHouseholdBudget] =
    useState(false);

  return (
    <main css={householdBudget}>
      {user !== undefined ? (
        <>
          <h1>家計簿</h1>
          <ButtonBox onClick={() => setOpenCreateHouseholdBudget(true)}>
            家計簿を作成する
          </ButtonBox>
          <ModalCreateHouseholdBudget
            open={openCreateHouseholdBudget}
            setOpen={setOpenCreateHouseholdBudget}
          />
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
