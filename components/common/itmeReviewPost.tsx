import { memo, useContext, useEffect } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import { TReviewPosts } from "@/types/reviewPost";
import NoPostImage from "@/images/noimage.png";
import NoUserImage from "@/images/noimage-user.png";
import { RatingBox } from "@/components/elements/ratingBox";
import { ReviewPostEdit } from "@/components/mypage/reviewPostEdit";
import { ReviewPostContext } from "@/provider/reviewPostProvider";
import { useQueryUser } from "@/hooks/user/useQueryUser";

type Props = {
  reviewPost: TReviewPosts;
};

export const ItmeReviewPost = memo(({ reviewPost }: Props) => {
  const { data: user } = useQueryUser();
  const { setReviewPostGlobal } = useContext(ReviewPostContext);

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
`;
