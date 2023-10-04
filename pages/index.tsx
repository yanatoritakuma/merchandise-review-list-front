import { css } from "@emotion/react";
import Image from "next/image";
import TopIcon from "@/images/top2.avif";
import { ProductSearch } from "@/components/top/productSearch";
import { ReviewPostLists } from "@/components/top/reviewPostLists";

const Home = () => {
  return (
    <main css={homePage}>
      <div className="homePage__box">
        <div className="homePage__titleBox">
          <h1>
            Merchandise
            <br />
            Review
            <br />
            List
          </h1>
          <Image src={TopIcon} alt="カート" />
        </div>
        <ProductSearch />
        <ReviewPostLists />
      </div>
    </main>
  );
};

const homePage = css`
  width: 100%;
  background-color: #ffd900;

  .homePage__box {
    margin: 0 auto;
    max-width: 1440px;
  }

  .homePage__titleBox {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 768px) {
      display: block;
    }

    h1 {
      padding: 0 24px 0 64px;
      color: #333;
      font-size: 60px;

      @media screen and (max-width: 1024px) {
        font-size: 48px;
      }

      @media screen and (max-width: 768px) {
        font-size: 60px;
      }

      @media screen and (max-width: 425px) {
        font-size: 36px;
      }
    }
    img {
      width: 74%;
      height: 80vh;
      max-height: 760px;
      object-fit: cover;
      border-radius: 0 0 0 30px;

      @media screen and (max-width: 1024px) {
        height: 60vh;
      }

      @media screen and (max-width: 768px) {
        margin-left: auto;
        display: block;
      }

      @media screen and (max-width: 425px) {
        width: 90%;
        height: 40vh;
      }

      @media screen and (max-width: 320px) {
        height: 30vh;
      }
    }
  }
`;

export default Home;
