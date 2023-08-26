"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "@/style/product-search/productSearch.scss";
import { PaginationBox } from "@/app/components/common/paginationBox";
import { TProducts } from "@/app/product-search/[product]/page";

type Props = {
  resProducts: TProducts;
  query: string;
};

export function ResultYahoo({ resProducts, query }: Props) {
  const router = useRouter();
  const [currentYahooPage, setCurrentYahooPage] = useState(1);
  console.log(currentYahooPage);
  //   todo: yahooAPIで初期検索（1ページ目）と2ページ目以降で総件数が変わって返ってくる
  //   const totalYahooPage = Math.ceil(resProducts.totalResultsAvailable / 20);
  useEffect(() => {
    router.push(`/product-search/${query}?page=${currentYahooPage}`);
  }, [currentYahooPage]);

  return (
    <div className="resultYahooBox">
      <h3>Yahooショッピング検索結果</h3>
      <span className="rresultYahooBox__topText">
        検索結果は30件までを上限にしています。
      </span>
      <span className="resultYahooBox__currentPage">
        {currentYahooPage}ページ目
      </span>
      {resProducts.hits?.map((hit) => (
        <Link
          key={hit.index}
          className="resultYahooBox__yahooBox"
          prefetch={false}
          href={hit.url}
        >
          <h4>商品名:{hit.name}</h4>
          <div className="resultYahooBox__yahooTextBox">
            <h5>商品説明</h5>
            <p dangerouslySetInnerHTML={{ __html: hit.description }} />
          </div>
          <span>在庫: {hit.inStock ? "あり" : "なし"}</span>
          <span>価格: {hit.price}</span>
          <span>レビュー平均: {hit.review.rate}</span>
          <Image
            src={hit.image.medium}
            width={320}
            height={320}
            alt="プロフィール画像"
          />
        </Link>
      ))}
      <PaginationBox
        count={30}
        currentPage={currentYahooPage}
        setCurrentPage={setCurrentYahooPage}
      />
    </div>
  );
}
