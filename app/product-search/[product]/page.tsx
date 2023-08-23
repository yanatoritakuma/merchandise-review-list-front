import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    product: string;
  };
};

async function fetchProduct(search: string) {
  const res = await fetch(
    `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=${process.env.NEXT_PUBLIC_YAHOO_API_URL}&query=${search}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const products = await res.json();
  return products;
}

export default async function Product({ params }: PageProps) {
  const resProducts = await fetchProduct(params.product);
  if (!resProducts) return notFound();
  return (
    <div>
      <h2>検索結果</h2>
      <h2>{params.product}</h2>
      <h2>{resProducts.hits[0].description}</h2>
    </div>
  );
}
