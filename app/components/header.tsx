"use client";

import Link from "next/link";
import { useEffect } from "react";
import { createHeaders } from "@/utils/getCsrf";

export default function Header() {
  useEffect(() => {
    const setDefaultHeaders = async () => {
      await createHeaders();
    };
    setDefaultHeaders();
  }, []);

  return (
    <header>
      <h2>ロゴ</h2>
      <Link href="/">ホーム</Link>
      <Link href="/auth">ログイン</Link>
    </header>
  );
}
