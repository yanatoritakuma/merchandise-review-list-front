import { memo } from "react";
import { css } from "@emotion/react";
import { useQueryClient } from "@tanstack/react-query";
import { TableBox } from "@/components/elements/tableBox";
import { TResMoneyManagement } from "@/types/moneyManagement";

type Props = {
  pieChartCategory: string[];
};

export const PricesByCategoryBox = memo(({ pieChartCategory }: Props) => {
  const queryClient = useQueryClient();
  const moneyManagements: TResMoneyManagement | undefined =
    queryClient.getQueryData(["moneyManagements"]);

  console.log("moneyManagements", moneyManagements);
  console.log("pieChartCategory", pieChartCategory);

  const tableDatas = [
    {
      category: "食品",
      price: moneyManagements?.food.itemTotalPrice,
      ratio: pieChartCategory[0],
    },
    {
      category: "飲料",
      price: moneyManagements?.drink.itemTotalPrice,
      ratio: pieChartCategory[1],
    },
    {
      category: "本",
      price: moneyManagements?.book.itemTotalPrice,
      ratio: pieChartCategory[2],
    },
    {
      category: "ファッション",
      price: moneyManagements?.fashion.itemTotalPrice,
      ratio: pieChartCategory[3],
    },
    {
      category: "家具",
      price: moneyManagements?.furniture.itemTotalPrice,
      ratio: pieChartCategory[4],
    },
    {
      category: "ゲーム・おもちゃ",
      price: moneyManagements?.gamesToys.itemTotalPrice,
      ratio: pieChartCategory[5],
    },
    {
      category: "美容",
      price: moneyManagements?.beauty.itemTotalPrice,
      ratio: pieChartCategory[6],
    },
    {
      category: "日用品",
      price: moneyManagements?.everyDayItems.itemTotalPrice,
      ratio: pieChartCategory[7],
    },
    {
      category: "その他",
      price: moneyManagements?.other.itemTotalPrice,
      ratio: pieChartCategory[8],
    },
  ];

  const categoryByDetails = () => {
    const date = new Date("2024-03-15T15:18:30.744283+09:00");
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Asia/Tokyo",
    };

    const japanTime = date.toLocaleString("ja-JP", options);
    console.log(japanTime); // 2024年3月15日 15時18分30秒

    const foodDetails =
      moneyManagements?.food.items.map((item) => {
        const date = new Date(item.updated_at);
        return {
          category: "食品",
          date: date.toLocaleString("ja-JP", options),
          name: item.title,
          unitPrice: item.unit_price,
          quantity: item.quantity,
          totalPrice: item.total_price,
        };
      }) ?? [];

    const drinkDetails =
      moneyManagements?.drink.items.map((item) => {
        const date = new Date(item.updated_at);
        return {
          category: "飲料",
          date: date.toLocaleString("ja-JP", options),
          name: item.title,
          unitPrice: item.unit_price,
          quantity: item.quantity,
          totalPrice: item.total_price,
        };
      }) ?? [];

    const bookDetails =
      moneyManagements?.book.items.map((item) => ({
        category: "本",
        date: item.updated_at,
        name: item.title,
        unitPrice: item.unit_price,
        quantity: item.quantity,
        totalPrice: item.total_price,
      })) ?? [];

    const fashionDetails =
      moneyManagements?.fashion.items.map((item) => ({
        category: "ファッション",
        date: item.updated_at,
        name: item.title,
        unitPrice: item.unit_price,
        quantity: item.quantity,
        totalPrice: item.total_price,
      })) ?? [];

    const furnitureDetails =
      moneyManagements?.furniture.items.map((item) => ({
        category: "家具",
        date: item.updated_at,
        name: item.title,
        unitPrice: item.unit_price,
        quantity: item.quantity,
        totalPrice: item.total_price,
      })) ?? [];

    const gamesToysDetails =
      moneyManagements?.gamesToys.items.map((item) => ({
        category: "ゲーム・おもちゃ",
        date: item.updated_at,
        name: item.title,
        unitPrice: item.unit_price,
        quantity: item.quantity,
        totalPrice: item.total_price,
      })) ?? [];

    const beautyDetails =
      moneyManagements?.beauty.items.map((item) => ({
        category: "美容",
        date: item.updated_at,
        name: item.title,
        unitPrice: item.unit_price,
        quantity: item.quantity,
        totalPrice: item.total_price,
      })) ?? [];

    const everyDayItemsDetails =
      moneyManagements?.everyDayItems.items.map((item) => ({
        category: "日用品",
        date: item.updated_at,
        name: item.title,
        unitPrice: item.unit_price,
        quantity: item.quantity,
        totalPrice: item.total_price,
      })) ?? [];

    const otherDetails =
      moneyManagements?.other.items.map((item) => ({
        category: "その他",
        date: item.updated_at,
        name: item.title,
        unitPrice: item.unit_price,
        quantity: item.quantity,
        totalPrice: item.total_price,
      })) ?? [];

    return [
      ...foodDetails,
      ...drinkDetails,
      ...bookDetails,
      ...fashionDetails,
      ...furnitureDetails,
      ...gamesToysDetails,
      ...beautyDetails,
      ...everyDayItemsDetails,
      ...otherDetails,
    ];
  };

  console.log("categoryByDetails", categoryByDetails());

  return (
    <section css={pricesByCategoryBox}>
      <TableBox
        tableHeads={["カテゴリー", "金額", "割合"]}
        tableDatas={tableDatas}
        tableDetails={categoryByDetails()}
        tableDetailHeads={["日付", "商品名", "値段", "個数", "合計金額"]}
      />
    </section>
  );
});

PricesByCategoryBox.displayName = "PricesByCategoryBox";

const pricesByCategoryBox = css`
  margin: 20px auto;
`;
