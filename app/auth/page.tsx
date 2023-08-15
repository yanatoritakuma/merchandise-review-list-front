import { use } from "react";
import Auth from "@/app/components/auth/auth";
import "@/style/auth/auth.scss";
import { fetchLoginUser } from "@/app/api/fetchLoginUser";
import Link from "next/link";

export default async function Page() {
  const loginUser = use(fetchLoginUser());
  return (
    <main className="auth">
      <div className="auth__box">
        {loginUser.id !== undefined ? (
          <div className="auth__loggedIn">
            <h3>ログイン済みです。</h3>
            <Link href="/">ホームへ</Link>
          </div>
        ) : (
          <Auth />
        )}
      </div>
    </main>
  );
}
