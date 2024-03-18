import { memo } from "react";
import { css } from "@emotion/react";
import { TableBox } from "@/components/elements/tableBox";

export const PricesByCategoryBox = memo(() => {
  return (
    <section css={pricesByCategoryBox}>
      <TableBox
        tableDatas={[
          { category: "食品", price: 1, ratio: 2 },
          { category: "飲料", price: 1, ratio: 2 },
        ]}
        tableDetails={[
          [
            {
              date: "12/1",
              name: "A",
              unitPrice: 1000,
              quantity: 1,
              totalPrice: 1000,
            },
          ],
        ]}
        tableHeads={["カテゴリー", "金額", "割合"]}
      />
    </section>
  );
});

PricesByCategoryBox.displayName = "PricesByCategoryBox";

const pricesByCategoryBox = css`
  margin: 20px 0;
`;
