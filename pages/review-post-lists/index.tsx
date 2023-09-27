import { css } from "@emotion/react";

const Index = () => {
  return (
    <main css={reviewPostListsBox}>
      <div className="reviewPostListsBox__box">
        <h2>レビュー投稿一覧</h2>
      </div>
    </main>
  );
};

export default Index;

const reviewPostListsBox = css`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #ffd900;

  .reviewPostListsBox__box {
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
