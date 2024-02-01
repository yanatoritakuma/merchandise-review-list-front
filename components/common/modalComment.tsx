import { memo, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { TextBox } from "@/components/elements/textBox";
import { ButtonBox } from "@/components/elements/buttonBox";
import { useMutateComment } from "@/hooks/comment/useMutateComment";
import { useQueryComment } from "@/hooks/comment/useQueryComment";
import { Modal } from "@mui/material";

type Props = {
  postId: number | null;
  setPostId: React.Dispatch<React.SetStateAction<number | null>>;
};

export const ModalComment = memo(({ postId, setPostId }: Props) => {
  const [comment, setComment] = useState("");
  const { commentMutation } = useMutateComment();
  const { data, refetch } = useQueryComment(
    1,
    10,
    postId !== null ? postId : 0
  );

  useEffect(() => {
    if (postId !== null) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const onClickAddComment = async () => {
    try {
      await commentMutation.mutateAsync({
        text: comment,
        post_id: postId !== null ? postId : 0,
      });
      setComment("");
      refetch();
    } catch (err) {
      console.error("err", err);
    }
  };

  return (
    <Modal open={postId !== null} onClose={() => setPostId(null)}>
      <div css={commentBox}>
        <div className="commentsBox__textBox">
          <TextBox
            label="コメント"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
            rows={5}
            fullWidth
          />
          <ButtonBox
            onClick={() => onClickAddComment()}
            disabled={comment === ""}
          >
            コメント追加
          </ButtonBox>
        </div>
        {data?.commentsRes.map((com, index) => (
          <div key={index}>
            <h3>{com.comment_user.name}</h3>
            <p>{com.text}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
});

ModalComment.displayName = "ModalComment";

const commentBox = css`
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 800px;
  height: auto;
  max-height: 90vh;
  background-color: #fff;
  border: 1px solid #333;
  border-radius: 10px;
  overflow-y: scroll;

  .commentsBox__textBox {
    margin: 20px auto;
    width: 80%;
  }

  button {
    margin: 20px auto;
    display: block;
  }
`;
