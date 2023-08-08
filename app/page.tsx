import Link from "next/link";
import "@/style/home.scss";

export default function Page() {
  return (
    <main className="page">
      <h1>商品購入レビューリスト</h1>
      <Link href="/auth">ログイン</Link>
      <p>aaaa</p>
    </main>
  );
}
