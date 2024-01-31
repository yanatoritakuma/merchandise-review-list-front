import { memo, useState } from "react";
import { css } from "@emotion/react";
import { TextBox } from "@/components/elements/textBox";
import { ButtonBox } from "@/components/elements/buttonBox";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useMutateComment } from "@/hooks/comment/useMutateComment";

type Props = {
  postId: number;
};

export const CommentBox = memo(({ postId }: Props) => {
  const [commentFlag, setCommentFlag] = useState(false);
  const [comment, setComment] = useState("");
  const { commentMutation } = useMutateComment();

  const onClickAddComment = async () => {
    try {
      await commentMutation.mutateAsync({
        text: comment,
        post_id: postId,
      });
      setComment("");
    } catch (err) {
      console.error("err", err);
    }
  };

  return (
    <div css={commentBox}>
      <div
        className="commentsBox__icon"
        onClick={() => setCommentFlag(!commentFlag)}
      >
        <ChatBubbleOutlineOutlinedIcon />
      </div>
      {commentFlag && (
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
      )}
    </div>
  );
});

CommentBox.displayName = "CommentBox";

const commentBox = css`
  .commentsBox__icon {
    cursor: pointer;
    width: fit-content;
  }

  .commentsBox__textBox {
    margin: 20px auto;
    width: 80%;
  }

  button {
    margin: 20px auto;
    display: block;
  }
`;
