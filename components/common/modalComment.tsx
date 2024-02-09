import { memo, useEffect, useState } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import { TextBox } from "@/components/elements/textBox";
import { ButtonBox } from "@/components/elements/buttonBox";
import { useMutateComment } from "@/hooks/comment/useMutateComment";
import { useQueryComment } from "@/hooks/comment/useQueryComment";
import { Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { PaginationBox } from "@/components/common/paginationBox";
import { countPages } from "@/utils/countPages";
import { CommentValidation } from "@/utils/validations/commentValidation";
import { useQueryClient } from "@tanstack/react-query";
import { TUser } from "@/types/user";
import NoUserImage from "@/images/noimage-user.png";

type Props = {
  postId: number | null;
  setPostId: React.Dispatch<React.SetStateAction<number | null>>;
  updateCount: number;
  setUpdateCount: React.Dispatch<React.SetStateAction<number>>;
};

export const ModalComment = memo(
  ({ postId, setPostId, updateCount, setUpdateCount }: Props) => {
    const queryClient = useQueryClient();
    const user: TUser | undefined = queryClient.getQueryData(["user"]);
    const [comment, setComment] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { commentMutation, commentDeleteMutation } = useMutateComment();
    const { commentValidation } = CommentValidation();
    const { data, refetch } = useQueryComment(
      currentPage,
      10,
      postId !== null ? postId : 0
    );

    useEffect(() => {
      if (postId !== null) {
        refetch();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId, currentPage]);

    const onClickAddComment = async () => {
      if (commentValidation(comment)) {
        try {
          await commentMutation.mutateAsync({
            text: comment,
            post_id: postId !== null ? postId : 0,
          });
          setComment("");
          setUpdateCount(updateCount + 1);
          refetch();
        } catch (err) {
          console.error("err", err);
        }
      }
    };

    const onClickDeleteComment = async (id: number) => {
      try {
        await commentDeleteMutation.mutateAsync(id);
        setUpdateCount(updateCount - 1);
        refetch();
      } catch (error) {
        console.error(error);
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
            <div key={index} className="commentsBox__comments">
              {com.comment_user.image !== "" ? (
                <Image
                  src={com.comment_user.image}
                  width={60}
                  height={60}
                  alt="プロフィール画像"
                />
              ) : (
                <Image
                  src={NoUserImage}
                  width={60}
                  height={60}
                  alt="プロフィール画像"
                />
              )}

              <div className="commentsBox__userBox">
                <h3>{com.comment_user.name}</h3>
                <p>{com.text}</p>
              </div>
              {com.user_id === user?.id && (
                <DeleteIcon onClick={() => onClickDeleteComment(com.id)} />
              )}
            </div>
          ))}
          <PaginationBox
            count={countPages(data !== undefined ? data?.totalPageCount : 0)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            noScroll
          />
        </div>
      </Modal>
    );
  }
);

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

  .commentsBox__comments {
    margin: 16px 0;
    display: flex;
    align-items: center;

    img {
      border-radius: 50%;
      object-fit: cover;
    }

    svg {
      color: #e9546b;
      cursor: pointer;
    }
  }

  .commentsBox__userBox {
    margin: 10px 0 10px 8px;
    width: 100%;

    h3 {
      margin: 6px 0;
    }

    p {
      margin: 0;
    }
  }
`;
