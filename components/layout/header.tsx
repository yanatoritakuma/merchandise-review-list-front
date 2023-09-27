import Link from "next/link";
import { css } from "@emotion/react";
import { useState } from "react";
import Image from "next/image";
import LogoIcon from "@/images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import { useQueryUser } from "@/hooks/user/useQueryUser";
import { useMutateAuth } from "@/hooks/auth/useMutateAuth";

export const Header = () => {
  const { data, isLoading } = useQueryUser();
  const { logoutMutation } = useMutateAuth();

  const [menuFlag, setMenuFlag] = useState(false);

  return (
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
            {!isLoading ? (
              <>
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
                {data?.id !== undefined && (
                  <Link prefetch={false} href="/review-post-lists">
                    投稿一覧
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
              </>
            ) : (
              <span>ユーザー情報取得中</span>
            )}
          </div>
          <div css={humBox}>
            <MenuIcon onClick={() => setMenuFlag(true)} />

            {menuFlag && (
              <Drawer
                anchor="right"
                css={humMenuBox}
                open={menuFlag}
                onClose={() => setMenuFlag(false)}
              >
                <div className="header__humMenuBox">
                  <CloseIcon onClick={() => setMenuFlag(false)} />
                  <Link
                    prefetch={false}
                    href="/"
                    onClick={() => setMenuFlag(false)}
                  >
                    ホーム
                  </Link>
                  <Link
                    prefetch={false}
                    href="/product-search"
                    onClick={() => setMenuFlag(false)}
                  >
                    商品検索
                  </Link>
                  {data?.id !== undefined && (
                    <Link
                      prefetch={false}
                      href="/mypage"
                      onClick={() => setMenuFlag(false)}
                    >
                      マイページ
                    </Link>
                  )}
                  {data?.id !== undefined && (
                    <Link
                      prefetch={false}
                      href="/review-post"
                      onClick={() => setMenuFlag(false)}
                    >
                      レビュー投稿
                    </Link>
                  )}
                  {data?.id !== undefined && (
                    <Link
                      prefetch={false}
                      href="/review-post-lists"
                      onClick={() => setMenuFlag(false)}
                    >
                      投稿一覧
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
                      <Link
                        prefetch={false}
                        href="/auth"
                        onClick={() => setMenuFlag(false)}
                      >
                        ログイン
                      </Link>
                    </>
                  )}
                </div>
              </Drawer>
            )}
          </div>
        </div>
      </div>
    </header>
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

const humMenuBox = css`
  .header__humMenuBox {
    padding: 20px;
    background-color: #fff;
    width: 80vw;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;

    a,
    span {
      margin: 24px 0 0 auto;
      display: block;
      color: #333;
      text-decoration: none;
      width: 50%;
      border-bottom: 1px solid #333;
      font-size: 18px;
    }
  }
`;
