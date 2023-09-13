import { css } from "@emotion/react";
import { TextBox } from "@/components/elements/textBox";
import { ButtonBox } from "@/components/elements/buttonBox";
import { useState } from "react";
import { ResultYahoo } from "@/components/product-search/resultYahoo";
import { ResultRakuten } from "@/components/product-search/resultRakuten";

const Index = () => {
  const [search, setSearch] = useState({
    input: "",
    search: "",
  });
  const [currentYahooPage, setCurrentYahooPage] = useState(1);
  const [currentRakutenPage, setCurrentRakutenPage] = useState(1);

  const onClickSearch = () => {
    setCurrentYahooPage(1);
    setCurrentRakutenPage(1);
    setSearch({
      ...search,
      search: search.input,
    });
  };

  return (
    <main css={productSearch}>
      <div className="productSearch__box">
        <h2>商品検索</h2>
        <div className="productSearch__inputBox">
          <TextBox
            label="商品検索"
            value={search.input}
            onChange={(e) =>
              setSearch({
                ...search,
                input: e.target.value,
              })
            }
          />
          <ButtonBox onClick={() => onClickSearch()}>検索</ButtonBox>
        </div>
        <div css={resultBox}>
          {search.search !== "" && (
            <ResultYahoo
              search={search.search}
              currentYahooPage={currentYahooPage}
              setCurrentYahooPage={setCurrentYahooPage}
            />
          )}
          {search.search !== "" && (
            <ResultRakuten
              search={search.search}
              currentRakutenPage={currentRakutenPage}
              setCurrentRakutenPage={setCurrentRakutenPage}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Index;

const productSearch = css`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #ffd900;

  .productSearch__box {
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

  .productSearch__inputBox {
    margin: 20px 0;
    display: flex;
    align-items: center;

    button {
      margin-left: 32px;
    }
  }
`;

const resultBox = css`
  display: flex;
  justify-content: space-between;
`;
