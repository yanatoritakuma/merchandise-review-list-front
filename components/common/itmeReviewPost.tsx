import { memo, useContext, useEffect, useState } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import { TReviewPosts } from "@/types/reviewPost";
import NoPostImage from "@/images/noimage.png";
import NoUserImage from "@/images/noimage-user.png";
import { RatingBox } from "@/components/elements/ratingBox";
import { ReviewPostEdit } from "@/components/mypage/reviewPostEdit";
import { ReviewPostContext } from "@/provider/reviewPostProvider";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useMutateLike } from "@/hooks/like/useMutateLike";
import { MessageContext } from "@/provider/messageProvider";
import { TUser } from "@/types/user";
import CircularProgress from "@mui/material/CircularProgress";
import { useQueryClient } from "@tanstack/react-query";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

type Props = {
  reviewPost: TReviewPosts;
  setCommentFlag: React.Dispatch<React.SetStateAction<number | null>>;
};

export const ItmeReviewPost = memo(({ reviewPost, setCommentFlag }: Props) => {
  const queryClient = useQueryClient();
  const user: TUser | undefined = queryClient.getQueryData(["user"]);
  const { setReviewPostGlobal } = useContext(ReviewPostContext);
  const { message, setMessage } = useContext(MessageContext);
  const [likeState, setLikeState] = useState({
    count: 0,
    status: false,
  });
  const { likeMutation, likeDeleteMutation } = useMutateLike();
  const likePostUserId = String(reviewPost.id) + String(user?.id);

  const DisplayLike = () => {
    return (
      <>
        {likeState.status ? (
          <span className="itemCartBox__like">
            <FavoriteOutlinedIcon onClick={() => onClickDeleteLike()} />
          </span>
        ) : (
          <span className="itemCartBox__like" onClick={() => onClickLike()}>
            <FavoriteBorderOutlinedIcon />
          </span>
        )}
        {likeMutation.isLoading || likeDeleteMutation.isLoading ? (
          <CircularProgress
            color="inherit"
            style={{ width: "18px", height: "18px" }}
          />
        ) : (
          <span>{likeState.count}</span>
        )}
      </>
    );
  };

  useEffect(() => {
    setLikeState({
      ...likeState,
      count: reviewPost.like_count,
      status: reviewPost.like_id !== 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickEdit = (selectPost: TReviewPosts) => {
    setReviewPostGlobal({
      id: selectPost.id,
      title: selectPost.title,
      text: selectPost.text,
      category: selectPost.category,
      image: selectPost.image,
      review: selectPost.review,
    });
  };

  const onClickLike = async () => {
    if (!user) {
      setMessage({
        ...message,
        text: "いいねをするにはログインが必要です",
        type: "error",
      });
      return;
    }
    try {
      const req = {
        post_id: reviewPost.id,
        post_user_id: Number(likePostUserId),
      };
      await likeMutation.mutateAsync(req);
      setLikeState({
        ...likeState,
        count: likeState.count + 1,
        status: true,
      });
      // refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const onClickDeleteLike = async () => {
    try {
      await likeDeleteMutation.mutateAsync(Number(likePostUserId));
      // refetch();
      setLikeState({
        ...likeState,
        count: likeState.count - 1,
        status: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div key={reviewPost.id} css={itmeReviewPostBox}>
      <div className="itemCartBox__userBox">
        {reviewPost.reviewPostUserResponse.image !== "" ? (
          <Image
            src={reviewPost.reviewPostUserResponse.image}
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
        <h5>{reviewPost.reviewPostUserResponse.name}</h5>
        {user?.id === reviewPost.reviewPostUserResponse.id && (
          <div
            className="itemCartBox__editBox"
            onClick={() => onClickEdit(reviewPost)}
          >
            <ReviewPostEdit />
          </div>
        )}
      </div>
      <h4>{reviewPost.title}</h4>
      <div className="itemCartBox__textBox">
        <h5>レビュー内容</h5>
        <p>{reviewPost.text}</p>
      </div>
      <div className="itemCartBox__textBox">
        <h5>カテゴリー</h5>
        <p>{reviewPost.category}</p>
      </div>
      <span className="itemCartBox__reviewBox">
        レビュー:
        <span className="itemCartBox__review">
          <RatingBox reviewState={reviewPost.review} readOnly />
        </span>
      </span>
      <div className="itemCartBox__likeBox">
        {likeMutation.isLoading || likeDeleteMutation.isLoading ? (
          <CircularProgress
            color="inherit"
            style={{ width: "18px", height: "18px" }}
          />
        ) : (
          <DisplayLike />
        )}
      </div>

      <div
        className="itemCartBox__commentIcon"
        onClick={() => setCommentFlag(reviewPost.id)}
      >
        <ChatBubbleOutlineOutlinedIcon />
        <span>{reviewPost.comment_count}</span>
      </div>

      <div className="itemCartBox__postImg">
        {reviewPost.image !== "" ? (
          <Image
            src={reviewPost.image}
            width={320}
            height={320}
            alt="商品画像"
          />
        ) : (
          <Image src={NoPostImage} width={320} height={320} alt="商品画像" />
        )}
      </div>
    </div>
  );
});

ItmeReviewPost.displayName = "ItmeReviewPost";

const itmeReviewPostBox = css`
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

  .itemCartBox__userBox {
    margin-bottom: 12px;
    display: flex;
    align-items: center;

    h5 {
      margin: 0 0 0 12px;
      font-size: 18px;
    }

    img {
      border-radius: 50%;
    }
  }

  .itemCartBox__editBox {
    display: block;
    width: 100%;
    text-align: end;
  }

  .itemCartBox__postImg {
    img {
      margin: 20px auto;
      display: block;
      width: 70%;
      min-width: 210px;
      height: auto;
      object-fit: contain;
    }
  }

  .itemCartBox__commentIcon {
    cursor: pointer;
    width: fit-content;
    display: flex;
    align-items: center;

    span {
      margin-left: 6px;
    }
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

  .itemCartBox__reviewBox {
    display: flex;
    align-items: center;

    .itemCartBox__review {
      margin-left: 12px;
    }
  }

  .itemCartBox__likeBox {
    display: flex;
    align-items: center;
  }

  .itemCartBox__like {
    margin-right: 6px;
    color: #e9546b;
    cursor: pointer;
  }
`;
