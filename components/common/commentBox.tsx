import { memo, useState } from "react";
import { css } from "@emotion/react";
import { TextBox } from "@/components/elements/textBox";
import { ButtonBox } from "@/components/elements/buttonBox";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useMutateComment } from "@/hooks/comment/useMutateComment";
import { useQueryComment } from "@/hooks/comment/useQueryComment";

type Props = {
  postId: number;
  count: number;
  commentFlag: number | null;
  setCommentFlag: React.Dispatch<React.SetStateAction<number | null>>;
};

export const CommentBox = memo(
  ({ postId, count, commentFlag, setCommentFlag }: Props) => {
    const [comment, setComment] = useState("");
    const { commentMutation } = useMutateComment();
    const { data } = useQueryComment(1, 10, postId);
    console.log(data);

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
          onClick={() => setCommentFlag(postId)}
        >
          <ChatBubbleOutlineOutlinedIcon />
          <span>{count}</span>
        </div>
        {commentFlag === postId && (
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
  }
);

CommentBox.displayName = "CommentBox";

const commentBox = css`
  .commentsBox__icon {
    cursor: pointer;
    width: fit-content;
    display: flex;
    align-items: center;

    span {
      margin-left: 6px;
    }
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
