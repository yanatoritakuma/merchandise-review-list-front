import { css } from "@emotion/react";
import { TextBox } from "@/components/elements/textBox";
import { ButtonBox } from "@/components/elements/buttonBox";
import { useState } from "react";
import { ResultYahoo } from "@/components/product-search/resultYahoo";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const onClickSearch = () => {
    router.push({
      pathname: "/product-search/result",
      query: { search: search, page: 1 },
    });
  };

  return (
    <main css={productSearch}>
      <div className="productSearch__box">
        <h2>商品検索</h2>
        <div>
          <TextBox
            label="商品検索"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ButtonBox onClick={() => onClickSearch()}>検索</ButtonBox>
        </div>
        {/* <ResultYahoo search={"コーヒー"} page={1} /> */}
      </div>
    </main>
  );
};

export default Index;

const productSearch = css`
  width: 100%;
  height: 100vh;
  background-color: #ffd900;

  .productSearch__box {
    margin: 0 auto;
    padding: 40px;
    max-width: 1440px;

    @media (max-width: 768px) {
      padding: 20px;
    }

    h2 {
      text-align: center;
    }
  }
`;
