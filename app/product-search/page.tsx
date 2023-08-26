import "@/style/product-search/productSearch.scss";
import { Search } from "@/app/components/product-search/search";

export default async function Page() {
  return (
    <main className="productSearch">
      <div className="productSearch__box">
        <h2>商品検索</h2>
        <Search />
      </div>
    </main>
  );
}
