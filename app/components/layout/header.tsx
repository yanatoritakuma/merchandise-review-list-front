"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createHeaders } from "@/utils/getCsrf";
import Image from "next/image";
import "@/style/layout/header.scss";
import LogoIcon from "@/images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import { TLoginUser } from "@/app/layout";

type Props = {
  loginUser: TLoginUser;
};

export default function Header({ loginUser }: Props) {
  console.log("loginUser", loginUser);
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
        cache: "force-cache",
        credentials: "include",
      });
      if (res.ok) {
        router.push("/");
        router.refresh();
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
            <Link href="/">ホーム</Link>
            <Link href="/">検索</Link>
            {loginUser.id !== undefined && <Link href="/">マイページ</Link>}
            {loginUser.id !== undefined && <Link href="/">レビュー投稿</Link>}
            {loginUser.id !== undefined && <Link href="/">タイムライン</Link>}
            {loginUser.id !== undefined ? (
              <>
                <span onClick={() => onClikcLogOut()}>ログアウト</span>
              </>
            ) : (
              <>
                <Link href="/auth">ログイン</Link>
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
                  <Link href="/">ホーム</Link>
                  <Link href="/">検索</Link>
                  {loginUser.id !== undefined && (
                    <Link href="/">マイページ</Link>
                  )}
                  {loginUser.id !== undefined && (
                    <Link href="/">レビュー投稿</Link>
                  )}
                  {loginUser.id !== undefined && (
                    <Link href="/">タイムライン</Link>
                  )}
                  {loginUser.id !== undefined ? (
                    <>
                      <span onClick={() => onClikcLogOut()}>ログアウト</span>
                    </>
                  ) : (
                    <>
                      <Link href="/auth">ログイン</Link>
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
