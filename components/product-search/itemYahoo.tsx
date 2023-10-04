import { memo, useContext, useState } from "react";
import { css } from "@emotion/react";
import { TYahooHit } from "@/types/yahoo";
import Link from "next/link";
import Image from "next/image";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useMutateProduct } from "@/hooks/product/useMutateProduct";
import { CircularProgress } from "@mui/material";
import { useQueryUser } from "@/hooks/user/useQueryUser";
import { MessageContext } from "@/provider/messageProvider";

type TItem = {
  hit: TYahooHit;
  index: number;
};

export const ItemYahoo = memo(({ hit, index }: TItem) => {
  const { data } = useQueryUser();
  const { productMutation } = useMutateProduct();
  const { setMessage } = useContext(MessageContext);
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

  const onClickCart = async (product: TYahooHit) => {
    if (!data) {
      setMessage({
        text: "ログインしていないとカートに商品をいれられません。",
        type: "error",
      });
    } else {
      try {
        await productMutation.mutateAsync({
          name: product.name,
          description: product.description,
          stock: product.inStock,
          price: product.price,
          review: product.review.rate,
          url: product.url,
          image: product.image.medium,
          code: product.code,
        });
      } catch (err) {
        console.error("err:", err);
      }
    }
  };

  return (
    <div key={hit.index} css={itemYahooBox}>
      <h4>{hit.name}</h4>
      <div className="itemYahooBox__yahooTextBox">
        <h5>商品説明</h5>
        {!moreTextFlag[index] ? (
          <p
            dangerouslySetInnerHTML={{
              __html: truncateString(hit.description, 100),
            }}
          />
        ) : (
          <p
            dangerouslySetInnerHTML={{
              __html: hit.description,
            }}
          />
        )}

        <span
          className="itemYahooBox__moreText"
          onClick={() => {
            const newArray = [...moreTextFlag];
            newArray[index] = !moreTextFlag[index];
            setMoreTextFlag(newArray);
          }}
        >
          {moreTextDescription(hit.description, moreTextFlag[index])}
        </span>
      </div>
      <span>在庫: {hit.inStock ? "あり" : "なし"}</span>
      <span>価格: {hit.price.toLocaleString()}円</span>
      <span>レビュー平均: {hit.review.rate}</span>
      <Link prefetch={false} href={hit.url} target="_blank">
        商品のサイトへ
      </Link>

      {!productMutation.isLoading ? (
        <span className="itemYahooBox__cart" onClick={() => onClickCart(hit)}>
          カートにいれる
          <ShoppingCartIcon className="itemYahooBox__cartIcon" />
        </span>
      ) : (
        <span className="resultRakutenBox__cartIsLoading">
          <CircularProgress />
        </span>
      )}
      <Image src={hit.image.medium} width={320} height={320} alt="商品画像" />
    </div>
  );
});

ItemYahoo.displayName = "ItemYahoo";

const itemYahooBox = css`
  margin: 20px 0;
  padding: 20px;
  display: block;
  width: 100%;
  height: 680px;
  border: 3px solid #f03;
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

  .itemYahooBox__cart {
    margin: 12px 0;
    padding: 4px 12px;
    display: flex;
    align-items: center;
    border: 2px solid #333;
    border-radius: 10px;
    width: fit-content;
    cursor: pointer;
  }

  .itemYahooBox__cartIcon {
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

  .itemYahooBox__yahooTextBox {
    margin: 20px 0;
    h5 {
      margin-bottom: 10px;
      font-size: 18px;
    }

    p {
      margin: 0;
    }
  }

  .itemYahooBox__moreText {
    margin: 12px 0;
    text-align: center;
    cursor: pointer;
  }
`;
