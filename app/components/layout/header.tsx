"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { createHeaders } from "@/utils/getCsrf";
import Image from "next/image";
import "@/style/layout/header.scss";
import LogoIcon from "@/images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import { TLoginUser } from "@/app/api/fetchLoginUser";
import { MessageContext } from "@/app/provider/messageProvider";

type Props = {
  loginUser: TLoginUser;
};

export default function Header({ loginUser }: Props) {
  const { message, setMessage } = useContext(MessageContext);
  const router = useRouter();

  useEffect(() => {
    const setDefaultHeaders = async () => {
      await createHeaders();
    };
    setDefaultHeaders();
  }, []);

  const [menuFlag, setMenuFlag] = useState(false);

  const onClikcLogOut = async () => {
    const headers = await createHeaders();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: "POST",
        headers: headers,
        cache: "no-store",
        credentials: "include",
      });
      if (res.ok) {
        router.push("/");
        router.refresh();
        setMessage({
          ...message,
          text: "ログアウトしました。",
          type: "success",
        });
      } else {
        setMessage({
          ...message,
          text: "ログアウトに失敗しました。",
          type: "error",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="header">
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
            {loginUser.id !== undefined && (
              <Link prefetch={false} href="/mypage">
                マイページ
              </Link>
            )}
            {loginUser.id !== undefined && (
              <Link prefetch={false} href="/">
                レビュー投稿
              </Link>
            )}
            {loginUser.id !== undefined && (
              <Link prefetch={false} href="/">
                タイムライン
              </Link>
            )}
            {loginUser.id !== undefined ? (
              <>
                <span onClick={() => onClikcLogOut()}>ログアウト</span>
              </>
            ) : (
              <>
                <Link prefetch={false} href="/auth">
                  ログイン
                </Link>
              </>
            )}
          </div>
          <div className="header__humBox">
            <MenuIcon onClick={() => setMenuFlag(true)} />

            {menuFlag && (
              <Drawer
                anchor="right"
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
                  {loginUser.id !== undefined && (
                    <Link
                      prefetch={false}
                      href="/mypage"
                      onClick={() => setMenuFlag(false)}
                    >
                      マイページ
                    </Link>
                  )}
                  {loginUser.id !== undefined && (
                    <Link
                      prefetch={false}
                      href="/"
                      onClick={() => setMenuFlag(false)}
                    >
                      レビュー投稿
                    </Link>
                  )}
                  {loginUser.id !== undefined && (
                    <Link
                      prefetch={false}
                      href="/"
                      onClick={() => setMenuFlag(false)}
                    >
                      タイムライン
                    </Link>
                  )}
                  {loginUser.id !== undefined ? (
                    <>
                      <span onClick={() => onClikcLogOut()}>ログアウト</span>
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
}
