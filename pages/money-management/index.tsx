import { useState } from "react";
import { css } from "@emotion/react";
import { useQueryGetMyMoneyManagements } from "@/hooks/money-management/useQueryGetMyMoneyManagements";
import { PieChartBox } from "@/components/money-management/pieChartBox";
import CircularProgress from "@mui/material/CircularProgress";
import { PricesByCategoryBox } from "@/components/money-management/pricesByCategoryBox";

const Index = () => {
  const { data, isLoading } = useQueryGetMyMoneyManagements(202403, false);
  console.log(data);
  const [pieChartCategory, setPieChartCategory] = useState([""]);
  console.log(pieChartCategory);

  const colorsCategory = [
    "#fe4c00", // food
    "#4357f2", // drink
    "#bb5520", // book
    "#f8e113", // fashion
    "#38b48b", // furniture
    "#d4dcda", // gamesToys
    "#e198b4", // beauty
    "#1e50a2", // everyDayItems
    "#432f2f", // other
  ];

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
      <h2>金額管理</h2>
      {!isLoading ? (
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
          <PricesByCategoryBox />
        </>
      ) : (
        <CircularProgress
          color="inherit"
          style={{ width: "18px", height: "18px" }}
        />
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
`;
