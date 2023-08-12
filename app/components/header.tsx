"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createHeaders } from "@/utils/getCsrf";
import Image from "next/image";
import "@/style/header.scss";
import LogoIcon from "@/images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";

export default function Header() {
  useEffect(() => {
    const setDefaultHeaders = async () => {
      await createHeaders();
    };
    setDefaultHeaders();
  }, []);

  const [menuFlag, setMenuFlag] = useState(false);

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
            <Link href="/">マイページ</Link>
            <Link href="/">レビュー投稿</Link>
            <Link href="/">タイムライン</Link>
            <Link href="/auth">ログイン</Link>
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
                  <Link href="/">マイページ</Link>
                  <Link href="/">レビュー投稿</Link>
                  <Link href="/">タイムライン</Link>
                  <Link href="/auth">ログイン</Link>
                </div>
              </Drawer>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
