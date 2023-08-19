import "@/style/mypage/mypage.scss";
import Profile from "../components/mypage/profile";
import { Suspense } from "react";

export default async function Page() {
  return (
    <main className="mypage">
      <div className="mypage__box">
        <h2>マイページ</h2>
        <Suspense fallback={"loading"}>
          <Profile />
        </Suspense>
      </div>
    </main>
  );
}
