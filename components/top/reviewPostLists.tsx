import { memo } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";
import ShoppingImg from "@/images/shopping.jpg";

export const ReviewPostLists = memo(() => {
  return (
    <section css={reviewPostListsBox}>
      <div className="reviewPostListsBox__textBox">
        <h2>投稿一覧</h2>
        <p>
          ユーザーが購入した商品を閲覧することができます。
          <br />
          実際に購入したユーザーのレビュー内容が分かります。
          <br />
          カテゴリー別で検索をして閲覧が可能です。
        </p>
        <Link href="/review-post-lists">投稿一覧へ</Link>
      </div>
      <Image src={ShoppingImg} alt="投稿一覧画像" />
    </section>
  );
});

ReviewPostLists.displayName = "ReviewPostLists";

const reviewPostListsBox = css`
  margin: 120px auto;
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

  .reviewPostListsBox__textBox {
    margin-right: 40px;

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
      width: 260px;
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
