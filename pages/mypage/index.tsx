import { Profile } from "@/components/mypage/profile";
import { css } from "@emotion/react";

const Index = () => {
  return (
    <main css={mypage}>
      <div className="mypage__box">
        <h2>マイページ</h2>
        <Profile />
      </div>
    </main>
  );
};

export default Index;

const mypage = css`
  width: 100%;
  height: 100vh;

  .mypage__box {
    margin: 60px auto;
    padding: 40px;
    max-width: 1200px;
    width: 94%;
    border: 4px solid #ffd900;
    border-radius: 10px;

    @media (max-width: 768px) {
      padding: 20px;
    }

    @media (max-width: 425px) {
      padding: 12px;
    }

    h2 {
      text-align: center;
    }
  }
`;
