import { SetStateAction, memo, useEffect, useState } from "react";
import { css } from "@emotion/react";
import Link from "next/link";
import Image from "next/image";
import { PaginationBox } from "@/components/common/paginationBox";
import { ResultSkeleton } from "@/components/product-search/resultSkeleton";
import { useQueryRakuten } from "@/hooks/rakuten/useQueryRakuten";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useMutateProduct } from "@/hooks/product/useMutateProduct";
import { TItems } from "@/types/rakuten";

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
    const { productMutation } = useMutateProduct();

    const initialFlagCount = 20;

    const initialMoreTextFlags = Array.from(
      { length: initialFlagCount },
      () => false
    );

    const [moreTextFlag, setMoreTextFlag] = useState(initialMoreTextFlags);

    const totalPage =
      data?.count !== undefined ? Math.ceil(data.count / 20) : 0;

    const totalCountPage = totalPage > 100 ? 100 : totalPage;

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

    const onClickCart = async (items: TItems) => {
      try {
        await productMutation.mutateAsync({
          name: items.Item.itemName,
          description: items.Item.itemCaption,
          stock: items.Item.availability === 0 ? false : true,
          price: items.Item.itemPrice,
          review: items.Item.reviewAverage,
          url: items.Item.itemUrl,
          image: items.Item.mediumImageUrls[0].imageUrl,
          code: items.Item.itemCode,
        });
      } catch (err) {
        console.error("err:", err);
      }
    };

    useEffect(() => {
      refetch();
      setMoreTextFlag(initialMoreTextFlags);
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
              <div key={index} className="resultRakutenBox__rakutenBox">
                <h4>{item.Item.itemName}</h4>
                <div className="resultRakutenBox__rakutenTextBox">
                  <h5>商品説明</h5>
                  {!moreTextFlag[index] ? (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: truncateString(item.Item.itemCaption, 100),
                      }}
                    />
                  ) : (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item.Item.itemCaption,
                      }}
                    />
                  )}
                  <span
                    className="resultRakutenBox__moreText"
                    onClick={() => {
                      const newArray = [...moreTextFlag];
                      newArray[index] = !moreTextFlag[index];
                      setMoreTextFlag(newArray);
                    }}
                  >
                    {moreTextDescription(
                      item.Item.itemCaption,
                      moreTextFlag[index]
                    )}
                  </span>
                </div>
                <span>
                  在庫: {item.Item.availability !== 0 ? "あり" : "なし"}
                </span>
                <span>価格: {item.Item.itemPrice}</span>
                <span>レビュー平均: {item.Item.reviewAverage}</span>
                <Link prefetch={false} href={item.Item.itemUrl} target="_blank">
                  商品のサイトへ
                </Link>
                <span
                  className="esultRakutenBox__cart"
                  onClick={() => onClickCart(item)}
                >
                  カートにいれる
                  <ShoppingCartIcon className="esultRakutenBox__cartIcon" />
                </span>
                <Image
                  src={item.Item.mediumImageUrls[0].imageUrl}
                  width={320}
                  height={320}
                  alt="プロフィール画像"
                />
              </div>
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

  .resultRakutenBox__rakutenBox {
    margin: 20px 0;
    padding: 20px;
    display: block;
    width: 100%;
    height: 680px;
    border: 3px solid #bf0000;
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

    .esultRakutenBox__cart {
      margin: 12px 0;
      padding: 4px 12px;
      display: flex;
      align-items: center;
      border: 2px solid #333;
      border-radius: 10px;
      width: fit-content;
      cursor: pointer;
    }

    .esultRakutenBox__cartIcon {
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

  .resultRakutenBox__rakutenTextBox {
    margin: 20px 0;
    h5 {
      margin-bottom: 10px;
      font-size: 18px;
    }

    p {
      margin: 0;
    }
  }

  .resultRakutenBox__moreText {
    margin: 12px 0;
    text-align: center;
    cursor: pointer;
  }
`;
