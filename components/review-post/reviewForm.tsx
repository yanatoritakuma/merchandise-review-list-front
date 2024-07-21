import { memo, useContext, useEffect, useState } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import { TextBox } from "../elements/textBox";
import { ButtonBox } from "../elements/buttonBox";
import { ImageRegistration } from "@/utils/imageRegistration";
import { useChangeImage } from "@/hooks/useChangeImage";
import { ReviewPostValidation } from "@/utils/validations/reviewPostValidation";
import { useMutateReviewPost } from "@/hooks/review-post/useMutateReviewPost";
import { RatingBox } from "@/components/elements/ratingBox";
import { TUser } from "@/types/user";
import { ReviewPostContext } from "@/provider/reviewPostProvider";
import { DeleteImgStorage } from "@/utils/deleteImgStorage";
import { BackdropContext } from "@/provider/backdropProvider";
import { SelectBox } from "@/components/elements/selectBox";
import { categoryMenuItem } from "@/constants/categoryMenuItem";
import { CheckBox } from "@/components/elements/checkbox";
import { PurchaseQuantityBox } from "@/components/common/purchaseQuantityBox";
import { useMutateMoneyManagement } from "@/hooks/money-management/useMutateMoneyManagement";

type Props = {
  type: "new" | "edit";
  setOpen?: (value: React.SetStateAction<boolean>) => void;
  user: TUser | undefined;
  review?: boolean;
};

export const ReviewForm = memo(({ type, setOpen, user, review }: Props) => {
  const { reviewPostGlobal, setReviewPostProcess } =
    useContext(ReviewPostContext);
  const { setBackdropFlag } = useContext(BackdropContext);
  const { reviewPostMutation, updateReviewPostMutation } =
    useMutateReviewPost();
  const { moneyManagementMutation } = useMutateMoneyManagement();
  const { onClickRegistration } = ImageRegistration();
  const { onChangeImageHandler, photoUrl, setPhotoUrl } = useChangeImage();
  const { deleteImg } = DeleteImgStorage();
  const [postState, setPostState] = useState({
    title: "",
    text: "",
    category: "",
    price: 0,
  });
  const [reviewState, setReviewState] = useState(0.5);

  const [management, setManagement] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [totalPrice, setTotalPrice] = useState(0);

  const [previewUrl, setPreviewUrl] = useState("");
  const { reviewPostValid } = ReviewPostValidation();
  const currentDate = new Date();
  // ISO 8601形式の文字列に変換
  const formattedDate = currentDate.toISOString();

  useEffect(() => {
    if (!photoUrl) {
      return;
    }

    let reader: FileReader | null = new FileReader();
    reader.onloadend = () => {
      const res = reader?.result;
      if (res && typeof res === "string") {
        setPreviewUrl(res);
      }
    };
    reader.readAsDataURL(photoUrl);

    return () => {
      reader = null;
    };
  }, [photoUrl]);

  useEffect(() => {
    if (type === "edit") {
      setPostState({
        title: reviewPostGlobal.title,
        text: reviewPostGlobal.text,
        category: reviewPostGlobal.category,
        price: 0,
      });
      setPreviewUrl(reviewPostGlobal.image);
      setReviewState(reviewPostGlobal.review);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (review) {
      setPostState({
        title: reviewPostGlobal.title,
        text: "",
        category: "",
        price: reviewPostGlobal.price,
      });
      setPreviewUrl(reviewPostGlobal.image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickRegister = async (file: string | null) => {
    try {
      await reviewPostMutation.mutateAsync({
        title: postState.title,
        text: postState.text,
        category: postState.category,
        image: file,
        review: reviewState,
      });
      if (review && management) {
        await moneyManagementMutation.mutateAsync({
          title: postState.title,
          category: postState.category,
          quantity: Number(quantity),
          unit_price: postState.price,
          total_price: totalPrice,
          updated_at: formattedDate,
        });
      }
      setPostState({
        title: "",
        text: "",
        category: "",
        price: 0,
      });
      setReviewState(0.5);
    } catch (err) {
      console.error("err:", err);
    }
  };

  const onClickUpdate = async (file: string | null) => {
    try {
      await updateReviewPostMutation.mutateAsync({
        id: reviewPostGlobal.id,
        title: postState.title,
        text: postState.text,
        category: postState.category,
        image: file !== null ? file : reviewPostGlobal.image,
        review: reviewState,
      });

      if (file !== null && user !== undefined) {
        deleteImg(reviewPostGlobal.image, "postImages", user.id);
      }
      setReviewPostProcess(true);
    } catch (err) {
      console.error("err:", err);
    }
  };

  const onClickMultipleRegister = () => {
    if (!review) {
      onClickRegistration(
        photoUrl,
        setPhotoUrl,
        setPreviewUrl,
        type === "new" ? onClickRegister : onClickUpdate,
        user
      ),
        type === "edit" && setOpen && setOpen(false);
    } else {
      setBackdropFlag(true);
      onClickRegister(previewUrl);
      setOpen && setOpen(false);
    }
  };

  return (
    <section css={reviewFormBox}>
      <div css={textBox}>
        <TextBox
          label="タイトル"
          value={postState.title}
          onChange={(e) =>
            setPostState({
              ...postState,
              title: e.target.value,
            })
          }
          fullWidth
        />
      </div>
      <div css={textBox}>
        <TextBox
          label="内容"
          value={postState.text}
          onChange={(e) =>
            setPostState({
              ...postState,
              text: e.target.value,
            })
          }
          fullWidth
          multiline
          rows={3}
        />
      </div>

      <div css={textBox}>
        <SelectBox
          label="カテゴリー"
          value={postState.category}
          onChange={(e) =>
            setPostState({
              ...postState,
              category: e.target.value,
            })
          }
          menuItem={categoryMenuItem}
        />
      </div>

      <div>
        <RatingBox reviewState={reviewState} setReviewState={setReviewState} />
      </div>

      {review && (
        <CheckBox
          label="支出に追加する"
          check={management}
          onChange={(e) => setManagement(e.target.checked)}
        />
      )}

      {management && (
        <PurchaseQuantityBox
          price={postState.price}
          quantity={quantity}
          setQuantity={setQuantity}
          setTotalPrice={setTotalPrice}
        />
      )}

      <ButtonBox onChange={onChangeImageHandler} upload />

      {previewUrl !== "" && (
        <div css={previewBox}>
          <Image src={previewUrl} fill sizes="100%" alt="プレビュー" />
        </div>
      )}

      <ButtonBox
        onClick={() =>
          reviewPostValid(postState, photoUrl) && onClickMultipleRegister()
        }
      >
        登録
      </ButtonBox>
    </section>
  );
});

ReviewForm.displayName = "ReviewForm";

const reviewFormBox = css`
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
  text-align: center;

  button {
    margin: 20px auto;
    display: block;
    width: 80%;
  }
`;

const textBox = css`
  margin: 20px 0;
`;

const previewBox = css`
  margin: 12px auto;
  width: 300px;
  height: 284px;
  position: relative;

  @media (max-width: 425px) {
    width: 100%;
    height: 260px;
  }

  img {
    object-fit: cover;
  }
`;
