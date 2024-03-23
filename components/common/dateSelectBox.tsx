import React, { memo } from "react";
import { css } from "@emotion/react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type Props = {
  currentYearMonth: Date;
  setCurrentYearMonth: React.Dispatch<React.SetStateAction<Date>>;
  tabSelected: boolean;
  setTabSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DateSelectBox = memo(
  ({
    currentYearMonth,
    setCurrentYearMonth,
    tabSelected,
    setTabSelected,
  }: Props) => {
    const onClickNextMonth = () => {
      const year = currentYearMonth.getFullYear();
      const month = currentYearMonth.getMonth();

      const nextMonth = new Date(year, month + 1, 1);
      const nextYear = year + 1;

      if (!tabSelected) {
        setCurrentYearMonth(nextMonth);
      } else {
        setCurrentYearMonth(new Date(nextYear, 0, 1));
      }
    };

    const onClickPreviousMonth = () => {
      const year = currentYearMonth.getFullYear();
      const month = currentYearMonth.getMonth();
      const previousMonth = new Date(year, month - 1, 1);
      const previousYear = year - 1;

      if (!tabSelected) {
        setCurrentYearMonth(previousMonth);
      } else {
        setCurrentYearMonth(new Date(previousYear, 0, 1));
      }
    };

    const year = currentYearMonth.getFullYear();
    const month = currentYearMonth.getMonth() + 1;

    return (
      <div css={dateSelectBox}>
        <div className="dateSelectBox__yearMonthBox">
          <span
            className={tabSelected ? "" : "tabSelected"}
            onClick={() => setTabSelected(false)}
          >
            月
          </span>
          <span
            className={tabSelected ? "tabSelected" : ""}
            onClick={() => setTabSelected(true)}
          >
            年
          </span>
        </div>
        <h3>
          <span onClick={() => onClickPreviousMonth()}>
            <NavigateBeforeIcon />
          </span>
          {year}年{!tabSelected && `${month}月`}
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

  .dateSelectBox__yearMonthBox {
    margin: 14px auto;
    max-width: 500px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    border: 2px solid #aaa;

    span {
      padding: 14px;
      background-color: #fff;
      text-align: center;
      cursor: pointer;

      &:nth-last-of-type(2) {
        border-radius: 10px 0 0 10px;
        width: 50%;
        border-right: 1px solid #aaa;
      }

      &:nth-last-of-type(1) {
        border-radius: 0 10px 10px 0;
        border-left: 1px solid #aaa;
        width: 50%;
      }
    }

    .tabSelected {
      background-color: #ffd900;
    }
  }
`;
