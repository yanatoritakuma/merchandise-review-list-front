import { ResultYahoo } from "@/app/components/product-search/resultYahoo";
import "@/style/product-search/productSearch.scss";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    product: string;
  };
  searchParams: {
    page: string;
  };
};

export type TProducts = {
  totalResultsAvailable: number; //総検索ヒット件数
  totalResultsReturned: number; //返却された商品件数
  firstResultsPosition: number; //最初のデータが何件目にあたるか（最初＝1）
  request: {
    query: string; //検索クエリ
  };
  hits: {
    index: number; //検索結果の順番
    name: string; //商品名
    description: string; //商品説明
    url: string; //商品URL
    inStock: boolean; //true：在庫ありのみ false：在庫なしのみ
    price: number; //価格
    image: {
      small: string;
      medium: string;
    };
    review: {
      rate: number; //レビュー平均
    };
  }[];
};

async function fetchProduct(search: string, searchParams: string) {
  const res = await fetch(
    `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=${process.env.NEXT_PUBLIC_YAHOO_API_URL}&query=${search}&start=${searchParams}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const products: TProducts = await res.json();
  return products;
}

export default async function Product({ params, searchParams }: PageProps) {
  const resProducts = await fetchProduct(params.product, searchParams.page);
  if (!resProducts) return notFound();

  return (
    <section className="product">
      <div className="product__box">
        <h2>検索結果</h2>
        <h3>検索名:{resProducts.request?.query}</h3>
        <h3>総検索ヒット件数:{resProducts.totalResultsAvailable}</h3>
        <h3>返却された商品件数:{resProducts.totalResultsReturned}</h3>
        <h3>
          最初のデータが何件目にあたるか（最初＝1）:
          {resProducts.firstResultsPosition}
        </h3>
        <Link href="/product-search">検索画面へ戻る</Link>
        <div className="product__resBox">
          <ResultYahoo resProducts={resProducts} query={params.product} />
          <div className="resBox__rakutenMainBox">
            <h3>楽天市場検索結果</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
