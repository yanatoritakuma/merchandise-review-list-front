import { memo } from "react";
import { css } from "@emotion/react";
import Modal from "@mui/material/Modal";
import { ReviewForm } from "@/components/review-post/reviewForm";
import { useQueryUser } from "@/hooks/user/useQueryUser";

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
};

export const ModalReviewPostEdit = memo(({ open, setOpen }: Props) => {
  const { data: user } = useQueryUser();
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div css={modalReviewPostEditBox}>
          <h3>編集</h3>
          <ReviewForm type="edit" setOpen={setOpen} user={user} />
        </div>
      </Modal>
    </div>
  );
});

ModalReviewPostEdit.displayName = "ModalReviewPostEdit";

const modalReviewPostEditBox = css`
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
`;
