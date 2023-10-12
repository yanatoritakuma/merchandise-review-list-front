import { memo, useContext, useState } from "react";
import { css } from "@emotion/react";
import { TProduct, TResProduct } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import { ButtonBox } from "@/components/elements/buttonBox";
import { TError } from "@/types/error";
import { useMutateProduct } from "@/hooks/product/useMutateProduct";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import { ModalReviewForm } from "@/components/review-post/modal/modalReviewForm";
import { ReviewPostContext } from "@/provider/reviewPostProvider";

type TItem = {
  pr: TProduct;
  index: number;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<TResProduct, TError>>;
  moreTextFlag: boolean[];
  setMoreTextFlag: React.Dispatch<React.SetStateAction<boolean[]>>;
};

export const ItemCart = memo(
  ({ pr, index, refetch, moreTextFlag, setMoreTextFlag }: TItem) => {
    const { deleteProductMutation } = useMutateProduct();
    const { reviewPostGlobal, setReviewPostGlobal } =
      useContext(ReviewPostContext);
    const [modalReviewFlag, setModalReviewFlag] = useState(false);

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
    const moreTextDescription = (
      description: string,
      moreTextFlag: boolean
    ) => {
      if (description?.length > 100) {
        return moreTextFlag ? "元に戻す" : "もっとみる";
      }
      return "";
    };

    const onClickDelete = async (id: number) => {
      await deleteProductMutation.mutateAsync(id).then(() => refetch());
    };

    const onClickModalReview = () => {
      setModalReviewFlag(true);
      setReviewPostGlobal({
        ...reviewPostGlobal,
        title: pr.name.slice(0, 50),
        image: pr.image,
      });
    };

    return (
      <div key={pr.id} css={itemCartBox}>
        <h4>{pr.name}</h4>
        <div className="itemCartBox__textBox">
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
            className="itemCartBox__moreText"
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
        <ButtonBox onClick={() => onClickModalReview()}>
          商品のレビューをする
        </ButtonBox>

        <Image src={pr.image} width={320} height={320} alt="商品画像" />
        <ModalReviewForm
          open={modalReviewFlag}
          setOpen={() => setModalReviewFlag(false)}
        />
      </div>
    );
  }
);

ItemCart.displayName = "ItemCart";

const itemCartBox = css`
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

  .itemCartBox__textBox {
    margin: 20px 0;
    h5 {
      margin-bottom: 10px;
      font-size: 18px;
    }

    p {
      margin: 0;
    }
  }

  .itemCartBox__moreText {
    margin: 12px 0;
    text-align: center;
    cursor: pointer;
  }
`;
