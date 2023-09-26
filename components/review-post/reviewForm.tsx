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

type Props = {
  type: "new" | "edit";
  setOpen?: (value: React.SetStateAction<boolean>) => void;
  user: TUser | undefined;
};

export const ReviewForm = memo(({ type, setOpen, user }: Props) => {
  const { reviewPostGlobal, setReviewPostProcess } =
    useContext(ReviewPostContext);
  const { reviewPostMutation, updateReviewPostMutation } =
    useMutateReviewPost();
  const { onClickRegistration } = ImageRegistration();
  const { onChangeImageHandler, photoUrl, setPhotoUrl } = useChangeImage();
  const { deleteImg } = DeleteImgStorage();
  const [postState, setPostState] = useState({
    title: "",
    text: "",
  });
  const [reviewState, setReviewState] = useState(0.5);

  const [previewUrl, setPreviewUrl] = useState("");
  const { reviewPostValid } = ReviewPostValidation();

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
      });
      setPreviewUrl(reviewPostGlobal.image);
      setReviewState(reviewPostGlobal.review);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickRegister = async (file: string | null) => {
    try {
      await reviewPostMutation.mutateAsync({
        title: postState.title,
        text: postState.text,
        image: file,
        review: reviewState,
      });
      setPostState({
        title: "",
        text: "",
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

      <div>
        <RatingBox reviewState={reviewState} setReviewState={setReviewState} />
      </div>

      <ButtonBox onChange={onChangeImageHandler} upload />

      {previewUrl !== "" && (
        <div css={previewBox}>
          <Image src={previewUrl} fill sizes="100%" alt="プレビュー" />
        </div>
      )}

      <ButtonBox
        onClick={() =>
          reviewPostValid(postState, photoUrl) &&
          (onClickRegistration(
            photoUrl,
            setPhotoUrl,
            setPreviewUrl,
            type === "new" ? onClickRegister : onClickUpdate,
            user
          ),
          type === "edit" && setOpen && setOpen(false))
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
