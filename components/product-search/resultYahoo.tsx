import { SetStateAction, memo, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { PaginationBox } from "@/components/common/paginationBox";
import { useQueryYahoo } from "@/hooks/yahoo/useQueryYahoo";
import { ResultSkeleton } from "@/components/product-search/resultSkeleton";
import { ItemYahoo } from "./itemYahoo";

type Props = {
  search: string;
  price: {
    min: string;
    max: string;
    searchmMinPrice: string;
    searchmMaxPrice: string;
  };
  currentYahooPage: number;
  setCurrentYahooPage: React.Dispatch<SetStateAction<number>>;
};

export const ResultYahoo = memo(
  ({ search, price, currentYahooPage, setCurrentYahooPage }: Props) => {
    const { data, refetch, isLoading, isFetching } = useQueryYahoo(
      search,
      price,
      currentYahooPage
    );

    //   todo: yahooAPIで初期検索（1ページ目）と2ページ目以降で総件数が変わって返ってくる
    // const totalYahooPage = Math.ceil(data.totalResultsAvailable / 20);

    useEffect(() => {
      refetch();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      currentYahooPage,
      search,
      price.searchmMinPrice,
      price.searchmMaxPrice,
      refetch,
    ]);

    if (isLoading || isFetching) {
      return <ResultSkeleton />;
    }

    return (
      <section css={resultYahooBox}>
        <h3>Yahooショッピング検索結果</h3>
        <span className="rresultYahooBox__topText">
          検索結果は30ページまでを上限にしています。
        </span>

        {data?.hits.length !== 0 ? (
          <div>
            <span className="resultYahooBox__currentPage">
              {currentYahooPage}ページ目
            </span>
            {data?.hits?.map((hit, index) => (
              <ItemYahoo key={index} hit={hit} index={index} />
            ))}
            <PaginationBox
              count={30}
              currentPage={currentYahooPage}
              setCurrentPage={setCurrentYahooPage}
            />
          </div>
        ) : (
          <div>検索結果がありません。</div>
        )}
      </section>
    );
  }
);

ResultYahoo.displayName = "ResultYahoo";

const resultYahooBox = css`
  width: 46%;

  @media (max-width: 768px) {
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
  }

  h3 {
    color: #f03;
  }

  .resultYahooBox__topText {
    display: block;
  }

  .resultYahooBox__currentPage {
    margin: 12px 0;
    display: block;
    font-size: 18px;
  }
`;
