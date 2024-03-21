import { memo, useState } from "react";
import { css } from "@emotion/react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type Props = {
  currentYearMonth: Date;
  setCurrentYearMonth: React.Dispatch<React.SetStateAction<Date>>;
};

export const DateSelectBox = memo(
  ({ currentYearMonth, setCurrentYearMonth }: Props) => {
    const onClickNextMonth = () => {
      const year = currentYearMonth.getFullYear();
      const month = currentYearMonth.getMonth();

      const nextMonth = new Date(year, month + 1, 1);

      setCurrentYearMonth(nextMonth);
    };

    const onClickPreviousMonth = () => {
      const year = currentYearMonth.getFullYear();
      const month = currentYearMonth.getMonth();
      const previousMonth = new Date(year, month - 1, 1);
      setCurrentYearMonth(previousMonth);
    };

    const year = currentYearMonth.getFullYear();
    const month = currentYearMonth.getMonth() + 1;

    return (
      <div css={dateSelectBox}>
        <h3>
          <span onClick={() => onClickPreviousMonth()}>
            <NavigateBeforeIcon />
          </span>
          {year}年{month}月
          <span onClick={() => onClickNextMonth()}>
            <NavigateNextIcon />
          </span>
        </h3>
      </div>
    );
  }
);

DateSelectBox.displayName = "DateSelectBox";

const dateSelectBox = css`
  padding: 10px;
  background-color: #f5f4f4;
  h3 {
    margin: 0 auto;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 500px;

    svg {
      cursor: pointer;
    }
  }
`;
