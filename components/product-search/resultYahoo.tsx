import { SetStateAction, memo, useEffect, useState } from "react";
import { css } from "@emotion/react";
import Link from "next/link";
import Image from "next/image";
import { PaginationBox } from "@/components/common/paginationBox";
import { useQueryYahoo } from "@/hooks/yahoo/useQueryYahoo";
import { ResultSkeleton } from "@/components/product-search/resultSkeleton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useMutateProduct } from "@/hooks/product/useMutateProduct";
import { TYahooHit } from "@/types/yahoo";

type Props = {
  search: string;
  currentYahooPage: number;
  setCurrentYahooPage: React.Dispatch<SetStateAction<number>>;
};

export const ResultYahoo = memo(
  ({ search, currentYahooPage, setCurrentYahooPage }: Props) => {
    //   todo: yahooAPIで初期検索（1ページ目）と2ページ目以降で総件数が変わって返ってくる
    //   const totalYahooPage = Math.ceil(resProducts.totalResultsAvailable / 20);
    const { data, refetch, isLoading, isFetching } = useQueryYahoo(
      search,
      currentYahooPage
    );
    const { productMutation } = useMutateProduct();

    const initialFlagCount = 20;

    const initialMoreTextFlags = Array.from(
      { length: initialFlagCount },
      () => false
    );

    const [moreTextFlag, setMoreTextFlag] = useState(initialMoreTextFlags);

    useEffect(() => {
      refetch();
      setMoreTextFlag(initialMoreTextFlags);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentYahooPage, search, refetch]);

    if (isLoading || isFetching) {
      return <ResultSkeleton />;
    }

    const truncateString = (inputString: string, maxLength: number) => {
      if (inputString?.length <= maxLength) {
        return inputString;
      } else {
        const truncated = inputString?.slice(0, maxLength - 3);
        return truncated + "...";
      }
    };

    const moreTextDescription = (
      description: string,
      moreTextFlag: boolean
    ) => {
      if (description?.length > 100) {
        return moreTextFlag ? "元に戻す" : "もっとみる";
      }
      return "";
    };

    const onClickCart = async (product: TYahooHit) => {
      try {
        await productMutation.mutateAsync({
          name: product.name,
          description: product.description,
          stock: product.inStock,
          price: product.price,
          review: product.review.rate,
          url: product.url,
          image: product.image.medium,
          code: product.code,
        });
      } catch (err) {
        console.error("err:", err);
      }
    };

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
              <div key={hit.index} className="resultYahooBox__yahooBox">
                <h4>{hit.name}</h4>
                <div className="resultYahooBox__yahooTextBox">
                  <h5>商品説明</h5>
                  {!moreTextFlag[index] ? (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: truncateString(hit.description, 100),
                      }}
                    />
                  ) : (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: hit.description,
                      }}
                    />
                  )}

                  <span
                    className="resultYahooBox__moreText"
                    onClick={() => {
                      const newArray = [...moreTextFlag];
                      newArray[index] = !moreTextFlag[index];
                      setMoreTextFlag(newArray);
                    }}
                  >
                    {moreTextDescription(hit.description, moreTextFlag[index])}
                  </span>
                </div>
                <span>在庫: {hit.inStock ? "あり" : "なし"}</span>
                <span>価格: {hit.price.toLocaleString()}円</span>
                <span>レビュー平均: {hit.review.rate}</span>
                <Link prefetch={false} href={hit.url} target="_blank">
                  商品のサイトへ
                </Link>
                <span
                  className="resultYahooBox__cart"
                  onClick={() => onClickCart(hit)}
                >
                  カートにいれる
                  <ShoppingCartIcon className="resultYahooBox__cartIcon" />
                </span>
                <Image
                  src={hit.image.medium}
                  width={320}
                  height={320}
                  alt="商品画像"
                />
              </div>
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

  .resultYahooBox__yahooBox {
    margin: 20px 0;
    padding: 20px;
    display: block;
    width: 100%;
    height: 680px;
    border: 3px solid #f03;
    border-radius: 10px;
    background-color: #fff;
    color: #333;
    overflow-y: scroll;

    @media (max-width: 425px) {
      height: 400px;
    }

    h4 {
      margin-top: 0;
      font-size: 20px;
    }

    span {
      margin: 6px 0;
      display: block;
    }

    .resultYahooBox__cart {
      margin: 12px 0;
      padding: 4px 12px;
      display: flex;
      align-items: center;
      border: 2px solid #333;
      border-radius: 10px;
      width: fit-content;
      cursor: pointer;
    }

    .resultYahooBox__cartIcon {
      margin-left: 12px;
    }

    a {
      color: #1976d2;
    }

    img {
      margin: 20px auto;
      display: block;
      width: 60%;
      height: auto;
      object-fit: contain;
    }
  }

  .resultYahooBox__yahooTextBox {
    margin: 20px 0;
    h5 {
      margin-bottom: 10px;
      font-size: 18px;
    }

    p {
      margin: 0;
    }
  }

  .resultYahooBox__moreText {
    margin: 12px 0;
    text-align: center;
    cursor: pointer;
  }
`;
