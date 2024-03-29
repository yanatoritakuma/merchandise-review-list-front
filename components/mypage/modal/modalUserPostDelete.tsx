import { memo, useContext, useState } from "react";
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useMutateUser } from "@/hooks/user/useMutateUser";
import { useQueryUser } from "@/hooks/user/useQueryUser";
import { DeleteImgStorage } from "@/utils/deleteImgStorage";
import { ButtonBox } from "@/components/elements/buttonBox";
import { CheckBox } from "@/components/elements/checkbox";
import { useMutateReviewPost } from "@/hooks/review-post/useMutateReviewPost";
import { ReviewPostContext } from "@/provider/reviewPostProvider";

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  type: "user" | "post";
};

export const ModalUserPostDelete = memo(({ open, setOpen, type }: Props) => {
  const { reviewPostGlobal, setReviewPostProcess } =
    useContext(ReviewPostContext);
  const { deleteReviewPostMutation } = useMutateReviewPost();
  const { deleteUserMutation } = useMutateUser();
  const { data: user } = useQueryUser();
  const { deleteImg, deleteAllUserPostsImg } = DeleteImgStorage();
  const [confirmFlag, setConfirmFlag] = useState(false);

  const onClickDelete = async () => {
    setOpen(false);

    try {
      if (type === "user" && user?.id) {
        await deleteUserMutation.mutateAsync(user.id);
        deleteAllUserPostsImg(user.id);
        if (user.image) {
          deleteImg(user.image, "userImages", user.id);
        }
      } else if (reviewPostGlobal.id) {
        await deleteReviewPostMutation.mutateAsync(reviewPostGlobal.id);
        setReviewPostProcess(true);
        if (reviewPostGlobal.image !== "" && user) {
          deleteImg(reviewPostGlobal.image, "postImages", user.id);
        }
      }
    } catch (error) {
      // エラーハンドリング
      console.error("削除中にエラーが発生しました:", error);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box css={deleteBox}>
          <h3>削除</h3>
          <p>
            {type === "user" ? (
              <>
                アカウントを削除しますか？
                <br />
                この操作は元に戻せません。
              </>
            ) : (
              <>
                この投稿を削除しますか？
                <br />
                この操作は元に戻せません。
              </>
            )}
          </p>
          <div css={checkBox}>
            <CheckBox
              label="削除する。"
              check={confirmFlag}
              onChange={(e) => setConfirmFlag(e.target.checked)}
            />
          </div>
          <ButtonBox onClick={() => onClickDelete()} disabled={!confirmFlag}>
            削除
          </ButtonBox>
        </Box>
      </Modal>
    </div>
  );
});

ModalUserPostDelete.displayName = "ModalUserPostDelete";

const deleteBox = css`
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  height: auto;
  max-height: 90vh;
  background-color: #fff;
  border: 1px solid #333;
  border-radius: 10px;
  overflow-y: scroll;
  text-align: center;

  p {
    color: #e9546b;
  }

  button {
    background-color: #e9546b;
    width: 100%;
    max-width: 200px;

    &:hover {
      background-color: #e9546b;
    }
  }
`;

const checkBox = css`
  margin: 20px auto;
  width: fit-content;
`;
