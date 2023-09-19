import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import Link from "next/link";
import Image from "next/image";
import { ButtonBox } from "@/components/elements/buttonBox";
import { PaginationBox } from "@/components/common/paginationBox";
import { useQueryUserProduct } from "@/hooks/product/useQueryUserProduct";
import { useMutateProduct } from "@/hooks/product/useMutateProduct";

export const Cart = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: products, refetch } = useQueryUserProduct(currentPage, 10);
  const { deleteProductMutation } = useMutateProduct();

  const initialFlagCount = 20;

  const initialMoreTextFlags = Array.from(
    { length: initialFlagCount },
    () => false
  );

  //   todo:共通化したい
  const [moreTextFlag, setMoreTextFlag] = useState(initialMoreTextFlags);

  //   todo:共通化したい
  const truncateString = (inputString: string, maxLength: number) => {
    if (inputString?.length <= maxLength) {
      return inputString;
    } else {
      const truncated = inputString?.slice(0, maxLength - 3);
      return truncated + "...";
    }
  };

  //   todo:共通化したい
  const moreTextDescription = (description: string, moreTextFlag: boolean) => {
    if (description?.length > 100) {
      return moreTextFlag ? "元に戻す" : "もっとみる";
    }
    return "";
  };

  const onClickDelete = async (id: number) => {
    await deleteProductMutation.mutateAsync(id).then(() => refetch());
  };

  // ページネーションで都道府県別投稿のAPI再取得
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const countPages = (totalPage: number) => {
    const total = totalPage / 10;
    return Math.ceil(total);
  };

  return (
    <div css={cartBox}>
      {products?.products.map((pr, index) => (
        <div key={pr.id} className="cartBox__inBox">
          <h4>{pr.name}</h4>
          <div className="cartBox__textBox">
            <h5>商品説明</h5>
            {!moreTextFlag[index] ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: truncateString(pr.description, 100),
                }}
              />
            ) : (
              <p
                dangerouslySetInnerHTML={{
                  __html: pr.description,
                }}
              />
            )}

            <span
              className="cartBox__moreText"
              onClick={() => {
                const newArray = [...moreTextFlag];
                newArray[index] = !moreTextFlag[index];
                setMoreTextFlag(newArray);
              }}
            >
              {moreTextDescription(pr.description, moreTextFlag[index])}
            </span>
          </div>
          <span>在庫: {pr.stock ? "あり" : "なし"}</span>
          <span>価格: {pr.price.toLocaleString()}円</span>
          <span>レビュー平均: {pr.review}</span>
          <Link prefetch={false} href={pr.url} target="_blank">
            商品のサイトへ
          </Link>

          <ButtonBox
            onClick={() => onClickDelete(pr.id)}
            disabled={deleteProductMutation.isLoading}
          >
            {!deleteProductMutation.isLoading ? "カートから削除" : "削除実行中"}
          </ButtonBox>

          <Image src={pr.image} width={320} height={320} alt="商品画像" />
        </div>
      ))}
      <PaginationBox
        count={countPages(
          products !== undefined ? products?.totalPageCount : 0
        )}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

const cartBox = css`
  .cartBox__inBox {
    margin: 20px 0;
    padding: 20px;
    display: block;
    width: 100%;
    height: 680px;
    border: 3px solid #aaa;
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

    a {
      color: #1976d2;
    }

    button {
      margin: 20px 0;
      display: block;
    }

    img {
      margin: 20px auto;
      display: block;
      width: 60%;
      height: auto;
      object-fit: contain;
    }
  }

  .cartBox__textBox {
    margin: 20px 0;
    h5 {
      margin-bottom: 10px;
      font-size: 18px;
    }

    p {
      margin: 0;
    }
  }

  .cartBox__moreText {
    margin: 12px 0;
    text-align: center;
    cursor: pointer;
  }
`;
