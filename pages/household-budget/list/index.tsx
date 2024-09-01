import { useQueryUser } from "@/hooks/user/useQueryUser";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@mui/material";
import { useMutatehouseholdBudgetEstimateItem } from "@/hooks/household-budget-estimate-item/useMutatehouseholdBudgetEstimateItem";

const Index = () => {
  const { data: user } = useQueryUser();
  const router = useRouter();
  const { query } = router;

  const { householdBudgetEstimateItemMutation } =
    useMutatehouseholdBudgetEstimateItem();

  const onClickBudgetEstimateItemMutation = () => {
    const reqEstimateItem = {
      year: 2024,
      month: 9,
      name: "コーラ2",
      amount: 1,
      fixed_cost: false,
      category_id: 1,
      household_budget_id: Number(query.id),
    };
    try {
      householdBudgetEstimateItemMutation.mutate(reqEstimateItem);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main css={householdBudget}>
      {user !== undefined ? (
        <>
          <h1>{query.title}</h1>
          <Button onClick={() => onClickBudgetEstimateItemMutation()}>
            追加
          </Button>
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
