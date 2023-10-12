import { memo } from "react";
import { css } from "@emotion/react";
import Modal from "@mui/material/Modal";
import { ReviewForm } from "@/components/review-post/reviewForm";
import { useQueryUser } from "@/hooks/user/useQueryUser";

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
};

export const ModalReviewForm = memo(({ open, setOpen }: Props) => {
  const { data: user } = useQueryUser();
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div css={ModalReviewFormBox}>
          <h3>レビュー投稿</h3>
          <ReviewForm type="new" setOpen={setOpen} user={user} review />
        </div>
      </Modal>
    </div>
  );
});

ModalReviewForm.displayName = "ModalReviewForm";

const ModalReviewFormBox = css`
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
