import { SetStateAction, memo, useEffect } from "react";
import { css } from "@emotion/react";
import { PaginationBox } from "@/components/common/paginationBox";
import { ResultSkeleton } from "@/components/product-search/resultSkeleton";
import { useQueryRakuten } from "@/hooks/rakuten/useQueryRakuten";
import { ItemRaukuten } from "./itemRaukuten";

type Props = {
  search: string;
  currentRakutenPage: number;
  setCurrentRakutenPage: React.Dispatch<SetStateAction<number>>;
};

export const ResultRakuten = memo(
  ({ search, currentRakutenPage, setCurrentRakutenPage }: Props) => {
    const { data, refetch, isLoading, isFetching } = useQueryRakuten(
      search,
      currentRakutenPage
    );

    const totalPage =
      data?.count !== undefined ? Math.ceil(data.count / 20) : 0;

    const totalCountPage = totalPage > 100 ? 100 : totalPage;

    useEffect(() => {
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRakutenPage, search, refetch]);

    if (isLoading || isFetching) {
      return <ResultSkeleton />;
    }

    return (
      <section css={resultRakutenBox}>
        <h3>楽天市場の検索結果</h3>
        <p>検索結果は100ページを上限にしています。</p>

        {data?.Items.length !== 0 ? (
          <div>
            <span className="resultRakutenBox__currentPage">
              {currentRakutenPage}ページ目
            </span>
            {data?.Items?.map((item, index) => (
              <ItemRaukuten key={index} item={item} index={index} />
            ))}
            <PaginationBox
              count={totalCountPage}
              currentPage={currentRakutenPage}
              setCurrentPage={setCurrentRakutenPage}
            />
          </div>
        ) : (
          <div>検索結果がありません。</div>
        )}
      </section>
    );
  }
);

ResultRakuten.displayName = "ResultRakuten";

const resultRakutenBox = css`
  width: 46%;

  @media (max-width: 768px) {
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
  }

  h3 {
    color: #bf0000;
  }

  .resultRakutenBox__topText {
    display: block;
  }

  .resultRakutenBox__currentPage {
    margin: 12px 0;
    display: block;
    font-size: 18px;
  }
`;
