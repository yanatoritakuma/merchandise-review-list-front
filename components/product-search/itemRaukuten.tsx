import { memo, useState } from "react";
import { css } from "@emotion/react";
import { useMutateProduct } from "@/hooks/product/useMutateProduct";
import { TItems } from "@/types/rakuten";
import Link from "next/link";
import Image from "next/image";
import { CircularProgress } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

type TItem = {
  item: TItems;
  index: number;
};

export const ItemRaukuten = memo(({ item, index }: TItem) => {
  const { productMutation } = useMutateProduct();
  const initialFlagCount = 20;

  const initialMoreTextFlags = Array.from(
    { length: initialFlagCount },
    () => false
  );

  const [moreTextFlag, setMoreTextFlag] = useState(initialMoreTextFlags);

  const truncateString = (inputString: string, maxLength: number) => {
    if (inputString?.length <= maxLength) {
      return inputString;
    } else {
      const truncated = inputString?.slice(0, maxLength - 3);
      return truncated + "...";
    }
  };

  const moreTextDescription = (description: string, moreTextFlag: boolean) => {
    if (description?.length > 100) {
      return moreTextFlag ? "元に戻す" : "もっとみる";
    }
    return "";
  };

  const onClickCart = async (items: TItems) => {
    try {
      await productMutation.mutateAsync({
        name: items.Item.itemName,
        description: items.Item.itemCaption,
        stock: items.Item.availability === 0 ? false : true,
        price: items.Item.itemPrice,
        review: items.Item.reviewAverage,
        url: items.Item.itemUrl,
        image: items.Item.mediumImageUrls[0].imageUrl,
        code: items.Item.itemCode,
      });
    } catch (err) {
      console.error("err:", err);
    }
  };

  return (
    <div css={rakutenItemBox}>
      <h4>{item.Item.itemName}</h4>
      <div className="rakutenItemBox__rakutenTextBox">
        <h5>商品説明</h5>
        {!moreTextFlag[index] ? (
          <p
            dangerouslySetInnerHTML={{
              __html: truncateString(item.Item.itemCaption, 100),
            }}
          />
        ) : (
          <p
            dangerouslySetInnerHTML={{
              __html: item.Item.itemCaption,
            }}
          />
        )}
        <span
          className="rakutenItemBox__moreText"
          onClick={() => {
            const newArray = [...moreTextFlag];
            newArray[index] = !moreTextFlag[index];
            setMoreTextFlag(newArray);
          }}
        >
          {moreTextDescription(item.Item.itemCaption, moreTextFlag[index])}
        </span>
      </div>
      <span>在庫: {item.Item.availability !== 0 ? "あり" : "なし"}</span>
      <span>価格: {item.Item.itemPrice}</span>
      <span>レビュー平均: {item.Item.reviewAverage}</span>
      <Link prefetch={false} href={item.Item.itemUrl} target="_blank">
        商品のサイトへ
      </Link>
      {!productMutation.isLoading ? (
        <span
          className="esultRakutenBox__cart"
          onClick={() => onClickCart(item)}
        >
          カートにいれる
          <ShoppingCartIcon className="esultRakutenBox__cartIcon" />
        </span>
      ) : (
        <span className="resultRakutenBox__cartIsLoading">
          <CircularProgress />
        </span>
      )}

      <Image
        src={item.Item.mediumImageUrls[0].imageUrl}
        width={320}
        height={320}
        alt="プロフィール画像"
      />
    </div>
  );
});

ItemRaukuten.displayName = "ItemRaukuten";

const rakutenItemBox = css`
  margin: 20px 0;
  padding: 20px;
  display: block;
  width: 100%;
  height: 680px;
  border: 3px solid #bf0000;
  border-radius: 10px;
  background-color: #fff;
  color: #333;
  overflow-y: scroll;

  @media (max-width: 425px) {
    height: 400px;
  }

  h4 {
    margin-top: 0;
    font-size: 20px;
  }

  span {
    margin: 6px 0;
    display: block;
  }

  .esultRakutenBox__cart {
    margin: 12px 0;
    padding: 4px 12px;
    display: flex;
    align-items: center;
    border: 2px solid #333;
    border-radius: 10px;
    width: fit-content;
    cursor: pointer;
  }

  .resultRakutenBox__cartIsLoading {
    margin: 20px 0;
  }

  .esultRakutenBox__cartIcon {
    margin-left: 12px;
  }

  a {
    color: #1976d2;
  }

  img {
    margin: 20px auto;
    display: block;
    width: 60%;
    height: auto;
    object-fit: contain;
  }

  .rakutenItemBox__rakutenTextBox {
    margin: 20px 0;
    h5 {
      margin-bottom: 10px;
      font-size: 18px;
    }

    p {
      margin: 0;
    }
  }

  .rakutenItemBox__moreText {
    margin: 12px 0;
    text-align: center;
    cursor: pointer;
  }
`;
