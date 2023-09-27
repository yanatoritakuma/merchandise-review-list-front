import { ReviewForm } from "@/components/review-post/reviewForm";
import { useQueryUser } from "@/hooks/user/useQueryUser";
import { css } from "@emotion/react";
import Link from "next/link";

const Index = () => {
  const { data: user } = useQueryUser();
  return (
    <main css={reviewPostBox}>
      <div className="reviewPostBox__box">
        {user !== undefined ? (
          <>
            <h2>レビュー投稿</h2>
            <ReviewForm type="new" user={user} />
          </>
        ) : (
          <div className="reviewPostBox__notlogin">
            <p>レビュー投稿は、ログインしていないとできません。</p>
            <Link href="/auth">ログイン画面へ</Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Index;

const reviewPostBox = css`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #ffd900;

  .reviewPostBox__box {
    margin: 0 auto;
    padding: 40px;
    max-width: 1440px;

    @media (max-width: 768px) {
      padding: 20px;
    }

    h2 {
      font-size: 28px;
      text-align: center;
    }
  }

  .reviewPostBox__notlogin {
    p {
      font-size: 20px;
      text-align: center;
    }

    a {
      margin: 20px auto;
      display: block;
      width: fit-content;
      font-size: 18px;
      text-decoration: none;
      color: #333;
    }
  }
`;
