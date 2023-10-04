import { memo } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import ProductSearchImg from "@/images/logo.jpg";
import Link from "next/link";

export const ProductSearch = memo(() => {
  return (
    <section css={productSearchBox}>
      <Image src={ProductSearchImg} alt="ロゴ" />
      <div className="productSearchBox__textBox">
        <h2>Yahooショッピングと楽天市場の商品検索</h2>
        <p>
          Yahooショッピングと楽天市場の商品を同時に検索ができます。
          <br />
          1度の検索で、商品や料金の比較ができます。
          <br />
          アカウントを作成することで、カートにいれてマイページから確認することができます。
        </p>
        <Link href="/product-search">商品検索へ</Link>
      </div>
    </section>
  );
});

ProductSearch.displayName = "ProductSearch";

const productSearchBox = css`
  margin: 60px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 94%;

  @media screen and (max-width: 768px) {
    display: block;
  }

  img {
    border-radius: 50%;
    width: 300px;
    height: 300px;

    @media screen and (max-width: 1024px) {
      width: 260px;
      height: 260px;
    }

    @media screen and (max-width: 768px) {
      margin: 0 auto;
      display: block;
    }

    @media screen and (max-width: 425px) {
      width: 220px;
      height: 220px;
    }
  }

  .productSearchBox__textBox {
    margin-left: 40px;

    @media screen and (max-width: 768px) {
      margin: 0;
    }

    h2 {
      font-size: 30px;

      @media screen and (max-width: 1024px) {
        font-size: 24px;
      }
    }

    p {
      font-size: 18px;
      line-height: 2em;

      @media screen and (max-width: 1024px) {
        font-size: 16px;
      }
    }

    a {
      margin: 20px auto;
      padding: 12px;
      display: block;
      width: 50%;
      min-width: 120px;
      text-decoration: none;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: #1976d2;
      border: 2px solid #1976d2;
      border-radius: 20px;

      @media screen and (max-width: 1024px) {
        font-size: 16px;
      }
    }
  }
`;
