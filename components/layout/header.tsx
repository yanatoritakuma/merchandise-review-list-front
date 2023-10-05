import Link from "next/link";
import Head from "next/head";
import { css } from "@emotion/react";
import Image from "next/image";
import LogoIcon from "@/images/logo.png";
import { useQueryUser } from "@/hooks/user/useQueryUser";
import { useMutateAuth } from "@/hooks/auth/useMutateAuth";
import { HambugerMenu } from "@/components/layout/hambugerMenu";

export const Header = () => {
  const { data } = useQueryUser();
  const { logoutMutation } = useMutateAuth();

  return (
    <>
      <Head>
        <title>MerchandiseReviewList</title>
        <meta name="You can list the products you want to purchase" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <header css={header}>
        <div className="header__logoLinkMainBox">
          <div className="header__logoLinkBox">
            <div className="header__logoBox">
              <div className="header__logo">
                <Image src={LogoIcon} alt="ロゴ" />
              </div>
              <h2>MRL</h2>
            </div>
            <div className="header__linkBox">
              <Link prefetch={false} href="/">
                ホーム
              </Link>
              <Link prefetch={false} href="/product-search">
                商品検索
              </Link>
              <Link prefetch={false} href="/review-post-lists">
                投稿一覧
              </Link>
              {data?.id !== undefined && (
                <Link prefetch={false} href="/mypage">
                  マイページ
                </Link>
              )}
              {data?.id !== undefined && (
                <Link prefetch={false} href="/review-post">
                  レビュー投稿
                </Link>
              )}
              {data?.id !== undefined ? (
                <>
                  <span onClick={() => logoutMutation.mutate()}>
                    ログアウト
                  </span>
                </>
              ) : (
                <>
                  <Link prefetch={false} href="/auth">
                    ログイン
                  </Link>
                </>
              )}
            </div>
            <div css={humBox}>
              <HambugerMenu user={data} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

const header = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  background-color: #ffd900;
  border-bottom: 4px solid #f6f61e;

  .header__logoLinkMainBox {
    margin: 0 auto;
    width: 100%;
    max-width: 1440px;
  }

  .header__logoLinkBox {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .header__logoBox {
    padding: 8px;
    display: flex;
    align-items: center;
    width: fit-content;

    h2 {
      padding-left: 12px;
      font-size: 14px;
    }

    .header__logo {
      width: 32px;
      height: 32px;
      img {
        width: 100%;
        height: auto;
        border-radius: 50%;
        object-fit: contain;
      }
    }
  }

  .header__linkBox {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    @media screen and (max-width: 768px) {
      display: none;
    }

    a,
    span {
      margin: 0 12px;
      display: block;
      color: #333;
      text-decoration: none;
      font-size: 14px;
      cursor: pointer;
    }
  }
`;

const humBox = css`
  display: none;
  @media screen and (max-width: 768px) {
    padding-right: 24px;
    width: 100%;
    display: flex;
    justify-content: flex-end;

    svg {
      cursor: pointer;
    }
  }
`;
