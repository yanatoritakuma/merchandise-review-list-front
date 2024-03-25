import { memo, useEffect } from "react";
import { css } from "@emotion/react";
import { SelectBox } from "@/components/elements/selectBox";
import { purchaseQuantityItem } from "@/constants/purchaseQuantityItem";

type Props = {
  price: number;
  quantity: string;
  setQuantity: React.Dispatch<React.SetStateAction<string>>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
};

export const PurchaseQuantityBox = memo(
  ({ price, quantity, setQuantity, setTotalPrice }: Props) => {
    useEffect(() => {
      setTotalPrice(price * Number(quantity));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity]);

    return (
      <div css={purchaseQuantityBox}>
        <div className="purchaseQuantityBox__quantityBox">
          <span>値段:{price.toLocaleString()}</span>×
          <SelectBox
            label="個数"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            menuItem={purchaseQuantityItem(100)}
          />
          個
        </div>
        <span className="purchaseQuantityBox__totalBox">
          合計金額:{Number(price * Number(quantity)).toLocaleString()}円
        </span>
      </div>
    );
  }
);

PurchaseQuantityBox.displayName = "PurchaseQuantityBox";

const purchaseQuantityBox = css`
  margin: 20px 0;
  .purchaseQuantityBox__quantityBox {
    display: flex;
    align-items: center;
  }

  .purchaseQuantityBox__totalBox {
    margin: 12px 0;
    display: block;
    font-size: 20px;
  }
`;
