import { memo } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";
import Noimage from "@/images/noimage-user.png";
import { TUser } from "@/types/user";

type Props = {
  user: TUser | undefined;
};

export const Mypage = memo(({ user }: Props) => {
  return (
    <section css={mypageBox}>
      {user ? (
        <Image src={user?.image} width={260} height={260} alt="ユーザー画像" />
      ) : (
        <Image src={Noimage} alt="ユーザー画像" />
      )}
      <div className="mypageBox__textBox">
        <h2>マイページ</h2>
        <p>
          今までにカート、いいね、投稿した商品を確認できます。
          <br />
          アカウントの編集ができます。
        </p>
        <Link href="/mypage">マイページへ</Link>
      </div>
    </section>
  );
});

Mypage.displayName = "Mypage";

const mypageBox = css`
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
    object-fit: cover;

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

  .mypageBox__textBox {
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
