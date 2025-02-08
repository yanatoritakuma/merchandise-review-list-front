import { useQueryHouseholdBudget } from "@/hooks/household-budget/useQueryHouseholdBudget";
import { css } from "@emotion/react";
import { memo, useEffect, useState } from "react";
import { PaginationBox } from "@/components/common/paginationBox";
import { countPages } from "@/utils/countPages";
import Link from "next/link";

type Props = {
  openCreateHouseholdBudget: boolean;
};

export const HouseholdBudgetList = memo(
  ({ openCreateHouseholdBudget }: Props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: budgetLists, refetch: budgetListsRefetch } =
      useQueryHouseholdBudget(currentPage, 10);

    useEffect(() => {
      budgetListsRefetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, openCreateHouseholdBudget]);

    return (
      <div css={listBox}>
        {budgetLists?.householdBudgets?.map((list) => (
          <Link
            href={`/household-budget/list?title=${list.title}&id=${list.id}`}
            key={list.id}
          >
            <h3>{list.title}</h3>
          </Link>
        ))}

        <PaginationBox
          count={countPages(
            budgetLists !== undefined ? budgetLists?.totalPageCount : 0
          )}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          noScroll
        />
      </div>
    );
  }
);

HouseholdBudgetList.displayName = "HouseholdBudgetList";

const listBox = css`
  width: 100%;
`;
