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
import { ModalInputManagement } from "@/components/money-management/modalInputManagement";
import { TManagementRowData } from "@/types/moneyManagement";
import { ModalInputBudget } from "@/components/money-management/modalInputBudget";
import { useQueryBudget } from "@/hooks/budget/useQueryBudget";
import { TabsBox } from "@/components/elements/tabsBox";

const Index = () => {
  const queryClient = useQueryClient();
  const user: TUser | undefined = queryClient.getQueryData(["user"]);
  const [pieChartCategory, setPieChartCategory] = useState([""]);
  const [currentYearMonth, setCurrentYearMonth] = useState<Date>(new Date());
  const [tabSelected, setTabSelected] = useState(false);
  const [modalInputFlag, setModalInputFlag] = useState(false);
  const [modalInputBudgetFlag, setModalInputBudgetFlag] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [modalUpdateFlag, setModalUpdateFlag] = useState(false);
  const [updateManagement, setUpdateManagement] =
    useState<TManagementRowData | null>(null);
  const [selectTab, setSelectTab] = useState(0);

  const date = new Date(currentYearMonth);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const yearMonth = Number(`${year}${String(month).padStart(2, "0")}`);

  const { data, isLoading, refetch, isFetching } =
    useQueryGetMyMoneyManagements(yearMonth, tabSelected);

  const { data: budget, refetch: budgetRefetch } = useQueryBudget(
    year,
    !tabSelected ? month : "all"
  );

  const onClickRow = (data: TManagementRowData) => {
    setUpdateManagement(data);
    setModalInputFlag(true);
    setModalUpdateFlag(true);
  };

  useEffect(() => {
    budgetRefetch();
  }, [currentYearMonth, modalInputBudgetFlag]);

  useEffect(() => {
    refetch();
    budgetRefetch();
    setPieChartCategory([""]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearMonth, tabSelected]);

  useEffect(() => {
    if (updateFlag && !modalInputFlag) {
      refetch();
      setUpdateFlag(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalInputFlag]);

  const pieChartManagement = [
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

  const pieChartBudget = [
    { name: "food", value: Number(budget?.budget.food) },
    { name: "drink", value: Number(budget?.budget.drink) },
    { name: "book", value: Number(budget?.budget.book) },
    { name: "fashion", value: Number(budget?.budget.fashion) },
    { name: "furniture", value: Number(budget?.budget.furniture) },
    { name: "gamesToys", value: Number(budget?.budget.games_toys) },
    { name: "beauty", value: Number(budget?.budget.beauty) },
    {
      name: "everyDayItems",
      value: Number(budget?.budget.every_day_items),
    },
    { name: "other", value: Number(budget?.budget.other) },
  ];

  const remainingBalance =
    Number(budget?.budget.total_price) - Number(data?.totalPrice);

  return (
    <main css={moneyManagementBox}>
      <h2>お金の管理</h2>
      <DateSelectBox
        currentYearMonth={currentYearMonth}
        setCurrentYearMonth={setCurrentYearMonth}
        tabSelected={tabSelected}
        setTabSelected={setTabSelected}
      />
      <div css={tabsBox}>
        <TabsBox
          labels={["支出", "予算"]}
          selectTab={selectTab}
          setSelectTab={setSelectTab}
        />
      </div>

      {user !== undefined ? (
        !isLoading && !isFetching ? (
          <>
            <div className="moneyManagementBox__TopBox">
              <div className="moneyManagementBox__pieChartBox">
                <PieChartBox
                  data={selectTab === 0 ? pieChartManagement : pieChartBudget}
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
              {selectTab === 0
                ? `支出合計金額:${data?.totalPrice.toLocaleString()}円`
                : `予算合計金額:${budget?.budget.total_price.toLocaleString()}円`}
            </h4>

            <p className="moneyManagementBox__remainingBalance">
              残り使える金額
              {remainingBalance.toLocaleString()}円
            </p>

            <div className="moneyManagementBox__addBox">
              <ButtonBox onClick={() => setModalInputFlag(true)}>
                支出に追加
              </ButtonBox>
              {!tabSelected && (
                <ButtonBox
                  onClick={() => setModalInputBudgetFlag(true)}
                  className="moneyManagementBox__budgetButoon"
                >
                  予算額設定
                </ButtonBox>
              )}

              <ModalInputManagement
                open={modalInputFlag}
                setOpen={setModalInputFlag}
                setUpdateFlag={setUpdateFlag}
                updateManagement={updateManagement}
                modalUpdateFlag={modalUpdateFlag}
                setModalUpdateFlag={setModalUpdateFlag}
              />
              <ModalInputBudget
                open={modalInputBudgetFlag}
                setOpen={setModalInputBudgetFlag}
                budget={budget}
                year={year}
                month={month}
              />
            </div>
            <PricesByCategoryBox
              pieChartCategory={pieChartCategory}
              moneyManagements={data}
              onClickRow={onClickRow}
              budget={budget}
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

  .moneyManagementBox__remainingBalance {
    margin: 20px auto;
    padding: 0 14px;
    max-width: 400px;
    font-size: 18px;
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
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .moneyManagementBox__budgetButoon {
    margin-left: 14px;
    background-color: #a8c97f;
  }
`;

const tabsBox = css`
  width: fit-content;
  margin: 10px auto;
`;
