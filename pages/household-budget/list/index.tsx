import { useQueryUser } from "@/hooks/user/useQueryUser";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@mui/material";
import { useMutatehouseholdBudgetEstimateItem } from "@/hooks/household-budget-estimate-item/useMutatehouseholdBudgetEstimateItem";
import { useQueryGetMyHouseholdBudgetEstimateItem } from "@/hooks/household-budget-estimate-item/useQueryGetMyHouseholdBudgetEstimateItem";
import { DateSelectBox } from "@/components/common/dateSelectBox";
import { useEffect, useState } from "react";
import { ButtonBox } from "@/components/elements/buttonBox";
import { ModalInputBudget } from "@/components/money-management/modalInputBudget";
import { ModalEstimate } from "@/components/household-budget/ModalEstimate";

const Index = () => {
  const { data: user } = useQueryUser();
  const router = useRouter();
  const { query } = router;
  const [currentYearMonth, setCurrentYearMonth] = useState<Date>(new Date());
  const [tabSelected, setTabSelected] = useState(false);
  const [modalInputBudgetFlag, setModalInputBudgetFlag] = useState(false);

  const { householdBudgetEstimateItemMutation } =
    useMutatehouseholdBudgetEstimateItem();

  const onClickBudgetEstimateItemMutation = () => {
    const reqEstimateItem = {
      year: 2024,
      month: 9,
      category_id: 1,
      household_budget_id: Number(query.id),
    };
    try {
      householdBudgetEstimateItemMutation.mutate(reqEstimateItem);
    } catch (error) {
      console.error(error);
    }
  };

  const { data, refetch } = useQueryGetMyHouseholdBudgetEstimateItem(
    Number(query.id),
    currentYearMonth.getFullYear(),
    currentYearMonth.getMonth() + 1
  );

  // 年月日変更後に家計簿予算を再取得
  useEffect(() => {
    if (!isNaN(Number(query.id))) {
      refetch();
    }
  }, [currentYearMonth]);

  console.log(data);

  return (
    <main css={householdBudget}>
      {user !== undefined ? (
        <>
          <h1>{query.title}</h1>
          <DateSelectBox
            currentYearMonth={currentYearMonth}
            setCurrentYearMonth={setCurrentYearMonth}
            tabSelected={tabSelected}
            setTabSelected={setTabSelected}
          />
          <Button onClick={() => onClickBudgetEstimateItemMutation()}>
            追加
          </Button>
          <ButtonBox
            onClick={() => setModalInputBudgetFlag(true)}
            className="estimateItemButoon"
          >
            予算額設定
          </ButtonBox>

          <ModalEstimate
            open={modalInputBudgetFlag}
            setOpen={setModalInputBudgetFlag}
            year={"2024"}
            month={"12"}
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

  .estimateItemButoon {
    margin-left: 14px;
    background-color: #a8c97f;
  }
`;
