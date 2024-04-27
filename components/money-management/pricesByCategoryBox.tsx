import { memo } from "react";
import { css } from "@emotion/react";
import { TableBox } from "@/components/elements/tableBox";
import {
  TManagementRowData,
  TResMoneyManagement,
} from "@/types/moneyManagement";
import { colorsCategory } from "@/constants/categoryMenuItem";

type Props = {
  pieChartCategory: string[];
  moneyManagements: TResMoneyManagement | undefined;
  onClickRow: (data: TManagementRowData) => void;
};

export const PricesByCategoryBox = memo(
  ({ pieChartCategory, moneyManagements, onClickRow }: Props) => {
    const categoryByDetails = () => {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        // 時間帯は非表示
        // hour: "numeric",
        // minute: "numeric",
        // second: "numeric",
        // timeZone: "Asia/Tokyo",
      };

      const foodDetails =
        moneyManagements?.food.items?.map((item) => {
          const date = new Date(item.updated_at);
          return {
            id: item.id,
            date: date.toLocaleString("ja-JP", options),
            name: item.title,
            category: "food",
            unitPrice: item.unit_price,
            quantity: item.quantity,
            totalPrice: item.total_price,
          };
        }) ?? [];

      const drinkDetails =
        moneyManagements?.drink.items?.map((item) => {
          const date = new Date(item.updated_at);
          return {
            id: item.id,
            date: date.toLocaleString("ja-JP", options),
            name: item.title,
            category: "drink",
            unitPrice: item.unit_price,
            quantity: item.quantity,
            totalPrice: item.total_price,
          };
        }) ?? [];

      const bookDetails =
        moneyManagements?.book.items?.map((item) => {
          const date = new Date(item.updated_at);
          return {
            id: item.id,
            date: date.toLocaleString("ja-JP", options),
            name: item.title,
            category: "book",
            unitPrice: item.unit_price,
            quantity: item.quantity,
            totalPrice: item.total_price,
          };
        }) ?? [];

      const fashionDetails =
        moneyManagements?.fashion.items?.map((item) => {
          const date = new Date(item.updated_at);
          return {
            id: item.id,
            date: date.toLocaleString("ja-JP", options),
            name: item.title,
            category: "fashion",
            unitPrice: item.unit_price,
            quantity: item.quantity,
            totalPrice: item.total_price,
          };
        }) ?? [];

      const furnitureDetails =
        moneyManagements?.furniture.items?.map((item) => {
          const date = new Date(item.updated_at);
          return {
            id: item.id,
            date: date.toLocaleString("ja-JP", options),
            name: item.title,
            category: "furniture",
            unitPrice: item.unit_price,
            quantity: item.quantity,
            totalPrice: item.total_price,
          };
        }) ?? [];

      const gamesToysDetails =
        moneyManagements?.gamesToys.items?.map((item) => {
          const date = new Date(item.updated_at);
          return {
            id: item.id,
            date: date.toLocaleString("ja-JP", options),
            name: item.title,
            category: "gamesToys",
            unitPrice: item.unit_price,
            quantity: item.quantity,
            totalPrice: item.total_price,
          };
        }) ?? [];

      const beautyDetails =
        moneyManagements?.beauty.items?.map((item) => {
          const date = new Date(item.updated_at);
          return {
            id: item.id,
            date: date.toLocaleString("ja-JP", options),
            name: item.title,
            category: "beauty",
            unitPrice: item.unit_price,
            quantity: item.quantity,
            totalPrice: item.total_price,
          };
        }) ?? [];

      const everyDayItemsDetails =
        moneyManagements?.everyDayItems.items?.map((item) => {
          const date = new Date(item.updated_at);
          return {
            id: item.id,
            date: date.toLocaleString("ja-JP", options),
            name: item.title,
            category: "everyDayItems",
            unitPrice: item.unit_price,
            quantity: item.quantity,
            totalPrice: item.total_price,
          };
        }) ?? [];

      const otherDetails =
        moneyManagements?.other.items?.map((item) => {
          const date = new Date(item.updated_at);
          return {
            id: item.id,
            date: date.toLocaleString("ja-JP", options),
            name: item.title,
            category: "other",
            unitPrice: item.unit_price,
            quantity: item.quantity,
            totalPrice: item.total_price,
          };
        }) ?? [];

      return {
        food: foodDetails,
        drink: drinkDetails,
        book: bookDetails,
        fashion: fashionDetails,
        furniture: furnitureDetails,
        gamesToys: gamesToysDetails,
        beauty: beautyDetails,
        everyDayItems: everyDayItemsDetails,
        other: otherDetails,
      };
    };

    const tableDatas = [
      {
        category: "食品",
        price: moneyManagements?.food.itemTotalPrice,
        ratio: pieChartCategory[0],
        details: categoryByDetails().food,
      },
      {
        category: "飲料",
        price: moneyManagements?.drink.itemTotalPrice,
        ratio: pieChartCategory[1],
        details: categoryByDetails().drink,
      },
      {
        category: "本",
        price: moneyManagements?.book.itemTotalPrice,
        ratio: pieChartCategory[2],
        details: categoryByDetails().book,
      },
      {
        category: "ファッション",
        price: moneyManagements?.fashion.itemTotalPrice,
        ratio: pieChartCategory[3],
        details: categoryByDetails().fashion,
      },
      {
        category: "家具",
        price: moneyManagements?.furniture.itemTotalPrice,
        ratio: pieChartCategory[4],
        details: categoryByDetails().furniture,
      },
      {
        category: "ゲーム・おもちゃ",
        price: moneyManagements?.gamesToys.itemTotalPrice,
        ratio: pieChartCategory[5],
        details: categoryByDetails().gamesToys,
      },
      {
        category: "美容",
        price: moneyManagements?.beauty.itemTotalPrice,
        ratio: pieChartCategory[6],
        details: categoryByDetails().beauty,
      },
      {
        category: "日用品",
        price: moneyManagements?.everyDayItems.itemTotalPrice,
        ratio: pieChartCategory[7],
        details: categoryByDetails().everyDayItems,
      },
      {
        category: "その他",
        price: moneyManagements?.other.itemTotalPrice,
        ratio: pieChartCategory[8],
        details: categoryByDetails().other,
      },
    ];

    return (
      <section css={pricesByCategoryBox}>
        <TableBox
          tableHeads={["カテゴリー", "金額", "割合"]}
          tableDatas={tableDatas}
          tableDetailHeads={["日付", "商品名", "値段", "個数", "合計金額"]}
          tableDetails
          colors={colorsCategory}
          onClickRow={onClickRow}
          hiddenItem={[0, 3]}
        />
      </section>
    );
  }
);

PricesByCategoryBox.displayName = "PricesByCategoryBox";

const pricesByCategoryBox = css`
  margin: 20px auto;
  padding: 12px;
`;
