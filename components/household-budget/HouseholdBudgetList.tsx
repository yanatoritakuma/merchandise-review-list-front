import { useQueryHouseholdBudget } from "@/hooks/household-budget/useQueryHouseholdBudget";
import { css } from "@emotion/react";
import { memo } from "react";

export const HouseholdBudgetList = memo(() => {
  const { data: budgetLists } = useQueryHouseholdBudget(1, 10);
  console.log(budgetLists);

  return (
    <div css={listBox}>
      {budgetLists?.householdBudgets?.map((list) => (
        <div key={list.id}>
          <h3>{list.title}</h3>
        </div>
      ))}
    </div>
  );
});

HouseholdBudgetList.displayName = "HouseholdBudgetList";

const listBox = css`
  width: 100%;
`;
