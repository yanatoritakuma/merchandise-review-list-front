import Link from "next/link";
import "@/style/product-search/productSearch.scss";
import { notFound } from "next/navigation";
import Image from "next/image";

type PageProps = {
  params: {
    product: string;
  };
};

type TProducts = {
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
    taxExcludePrice: number; //価格（税抜）
    image: {
      small: string;
      medium: string;
    };
    review: {
      rate: number; //レビュー平均
    };
  }[];
};

async function fetchProduct(search: string) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await fetch(
    `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=${
      process.env.NEXT_PUBLIC_YAHOO_API_URL
    }&query=${search}&start=${"1"}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const products: TProducts = await res.json();
  return products;
}

export default async function Product({ params }: PageProps) {
  const resProducts = await fetchProduct(params.product);
  if (!resProducts) return notFound();

  return (
    <section className="product">
      <div className="product__box">
        <h2>検索結果</h2>
        <h3>検索名:{resProducts.request.query}</h3>
        <h3>総検索ヒット件数:{resProducts.totalResultsAvailable}</h3>
        <h3>返却された商品件数:{resProducts.totalResultsReturned}</h3>
        <h3>
          最初のデータが何件目にあたるか（最初＝1）:
          {resProducts.firstResultsPosition}
        </h3>
        {resProducts.hits.map((hit) => (
          <div key={hit.index}>
            <h4>商品名:{hit.name}</h4>
            <span>商品説明:{hit.description}</span>
            <span>商品URL:{hit.url}</span>
            <span>在庫:{hit.inStock}</span>
            <span>価格（税抜）:{hit.taxExcludePrice}</span>
            <span>レビュー平均:{hit.review.rate}</span>
            <Image
              src={hit.image.medium}
              width={80}
              height={80}
              alt="プロフィール画像"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
