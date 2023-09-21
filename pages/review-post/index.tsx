import { ReviewForm } from "@/components/review-post/reviewForm";
import { css } from "@emotion/react";

const Index = () => {
  return (
    <main css={reviewPostBox}>
      <div className="reviewPostBox__box">
        <h2>レビュー投稿</h2>
        <ReviewForm type="new" />
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
`;
