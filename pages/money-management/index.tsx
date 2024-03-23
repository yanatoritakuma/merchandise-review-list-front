import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useQueryClient } from "@tanstack/react-query";
import { TUser } from "@/types/user";
import { useQueryGetMyMoneyManagements } from "@/hooks/money-management/useQueryGetMyMoneyManagements";
import { PieChartBox } from "@/components/money-management/pieChartBox";
import CircularProgress from "@mui/material/CircularProgress";
import { PricesByCategoryBox } from "@/components/money-management/pricesByCategoryBox";
import { colorsCategory } from "@/constants/categoryMenuItem";
import { DateSelectBox } from "@/components/common/dateSelectBox";
import { ButtonBox } from "@/components/elements/buttonBox";

const Index = () => {
  const queryClient = useQueryClient();
  const user: TUser | undefined = queryClient.getQueryData(["user"]);
  const [pieChartCategory, setPieChartCategory] = useState([""]);
  const [currentYearMonth, setCurrentYearMonth] = useState<Date>(new Date());
  const [tabSelected, setTabSelected] = useState(false);

  const date = new Date(currentYearMonth);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const yearMonth = Number(`${year}${String(month).padStart(2, "0")}`);

  const { data, isLoading, refetch, isFetching } =
    useQueryGetMyMoneyManagements(yearMonth, tabSelected);

  useEffect(() => {
    refetch();
    setPieChartCategory([""]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearMonth, tabSelected]);

  const pieChartData = [
    { name: "food", value: Number(data?.food.itemTotalPrice) },
    { name: "drink", value: Number(data?.drink.itemTotalPrice) },
    { name: "book", value: Number(data?.book.itemTotalPrice) },
    { name: "fashion", value: Number(data?.fashion.itemTotalPrice) },
    { name: "furniture", value: Number(data?.furniture.itemTotalPrice) },
    { name: "gamesToys", value: Number(data?.gamesToys.itemTotalPrice) },
    { name: "beauty", value: Number(data?.beauty.itemTotalPrice) },
    {
      name: "everyDayItems",
      value: Number(data?.everyDayItems.itemTotalPrice),
    },
    { name: "other", value: Number(data?.other.itemTotalPrice) },
  ];

  return (
    <main css={moneyManagementBox}>
      <h2>お金の管理</h2>
      <DateSelectBox
        currentYearMonth={currentYearMonth}
        setCurrentYearMonth={setCurrentYearMonth}
        tabSelected={tabSelected}
        setTabSelected={setTabSelected}
      />
      {user !== undefined ? (
        !isLoading && !isFetching ? (
          <>
            <div className="moneyManagementBox__TopBox">
              <div className="moneyManagementBox__pieChartBox">
                <PieChartBox
                  data={pieChartData}
                  colors={colorsCategory}
                  setPieChartCategory={setPieChartCategory}
                />
              </div>
              <ul className="moneyManagementBox__pieChartTextBox">
                <li>食品</li>
                <li>飲料</li>
                <li>本</li>
                <li>ファッション</li>
                <li>家具</li>
                <li>ゲーム・おもちゃ</li>
                <li>美容</li>
                <li>日用品</li>
                <li>その他</li>
              </ul>
            </div>
            <h4 className="moneyManagementBox__totalPrice">
              合計金額: {data?.totalPrice.toLocaleString()}円
            </h4>
            <div className="moneyManagementBox__addBox">
              <ButtonBox>管理に追加</ButtonBox>
            </div>
            <PricesByCategoryBox
              pieChartCategory={pieChartCategory}
              moneyManagements={data}
            />
          </>
        ) : (
          <div className="moneyManagementBox__progressBox">
            <CircularProgress
              color="inherit"
              style={{ width: "30px", height: "30px" }}
            />
          </div>
        )
      ) : (
        <h2>ログインしていません</h2>
      )}
    </main>
  );
};

export default Index;

const moneyManagementBox = css`
  margin: 60px auto;
  width: 100%;
  max-width: 1200px;

  h2 {
    text-align: center;
  }

  .moneyManagementBox__TopBox {
    margin: 0 auto;
    display: flex;
    align-items: center;
    max-width: 600px;
    min-width: 300px;
  }

  .moneyManagementBox__pieChartBox {
    margin: 0 auto;
    width: 300px;
    height: 240px;
  }

  .moneyManagementBox__totalPrice {
    margin: 0 auto;
    padding: 0 14px;
    max-width: 400px;
    font-size: 20px;
  }

  .moneyManagementBox__pieChartTextBox {
    display: block;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      &::before {
        content: "";
        margin-right: 4px;
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
      &:nth-of-type(1) {
        &::before {
          background-color: #fe4c00;
        }
      }
      &:nth-of-type(2) {
        &::before {
          background-color: #4357f2;
        }
      }
      &:nth-of-type(3) {
        &::before {
          background-color: #bb5520;
        }
      }
      &:nth-of-type(4) {
        &::before {
          background-color: #f8e113;
        }
      }
      &:nth-of-type(5) {
        &::before {
          background-color: #38b48b;
        }
      }
      &:nth-of-type(6) {
        &::before {
          background-color: #d4dcda;
        }
      }
      &:nth-of-type(7) {
        &::before {
          background-color: #e198b4;
        }
      }
      &:nth-of-type(8) {
        &::before {
          background-color: #1e50a2;
        }
      }
      &:nth-of-type(9) {
        &::before {
          background-color: #432f2f;
        }
      }
    }
  }

  .moneyManagementBox__progressBox {
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .moneyManagementBox__addBox {
    margin: 8px 0;
    padding: 0 12px;
    text-align: end;
  }
`;
