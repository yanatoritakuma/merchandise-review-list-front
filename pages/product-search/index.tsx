import { useCallback, useState } from "react";
import { css } from "@emotion/react";
import { TextBox } from "@/components/elements/textBox";
import { ButtonBox } from "@/components/elements/buttonBox";
import { ResultYahoo } from "@/components/product-search/resultYahoo";
import { ResultRakuten } from "@/components/product-search/resultRakuten";
import { TabsBox } from "@/components/elements/tabsBox";
import { AccordionBox } from "@/components/elements/accordionBox";
import { SearchOption } from "@/components/product-search/searchOption";
import { ProductSearchValidation } from "@/utils/validations/productSearchValidation";

const Index = () => {
  const [search, setSearch] = useState({
    input: "",
    search: "",
  });
  const [price, setPrice] = useState({
    min: "",
    max: "",
    searchmMinPrice: "",
    searchmMaxPrice: "",
  });
  const [sort, setSort] = useState("standard");
  const [selectSort, setSelectSort] = useState("standard");
  const [currentYahooPage, setCurrentYahooPage] = useState(1);
  const [currentRakutenPage, setCurrentRakutenPage] = useState(1);
  const [selectTab, setSelectTab] = useState(0);
  const { productSearchValidation } = ProductSearchValidation();

  const onClickSearch = () => {
    if (productSearchValidation(price, search.input)) {
      setCurrentYahooPage(1);
      setCurrentRakutenPage(1);
      setSearch({
        ...search,
        search: search.input,
      });
      setPrice({
        ...price,
        searchmMinPrice: price.min,
        searchmMaxPrice: price.max,
      });
      setSelectSort(sort);
    }
  };

  // Enterキーが押された場合に検索を実行
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      if (productSearchValidation(price, search.input)) {
        onClickSearch();
      }
    }
  };

  return (
    <main css={productSearch}>
      <div className="productSearch__box">
        <h2>商品検索</h2>
        <div className="productSearch__inputMainBox" onKeyDown={handleKeyDown}>
          <p>
            Yahooショッピングと楽天市場の商品を同時に検索できます。
            <br />
            商品名で検索してください。
          </p>
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
              fullWidth
            />
            <ButtonBox onClick={() => onClickSearch()}>検索</ButtonBox>
          </div>
          <AccordionBox
            title="オプション"
            text="値段で絞り込みができます。"
            components={
              <SearchOption
                price={price}
                setPrice={setPrice}
                sort={sort}
                setSort={setSort}
              />
            }
          />
        </div>

        <div css={resultBox}>
          {search.search !== "" && (
            <div css={tabBox}>
              <TabsBox
                labels={["Yahoo", "楽天"]}
                selectTab={selectTab}
                setSelectTab={setSelectTab}
              />
            </div>
          )}
          <div className="resultBox__pc">
            {search.search !== "" && (
              <ResultYahoo
                search={search.search}
                price={price}
                sort={selectSort}
                currentYahooPage={currentYahooPage}
                setCurrentYahooPage={setCurrentYahooPage}
              />
            )}
            {search.search !== "" && (
              <ResultRakuten
                search={search.search}
                price={price}
                sort={selectSort}
                currentRakutenPage={currentRakutenPage}
                setCurrentRakutenPage={setCurrentRakutenPage}
              />
            )}
          </div>
          <div className="resultBox__sp">
            {selectTab === 0
              ? search.search !== "" && (
                  <ResultYahoo
                    search={search.search}
                    price={price}
                    sort={selectSort}
                    currentYahooPage={currentYahooPage}
                    setCurrentYahooPage={setCurrentYahooPage}
                  />
                )
              : search.search !== "" && (
                  <ResultRakuten
                    search={search.search}
                    price={price}
                    sort={selectSort}
                    currentRakutenPage={currentRakutenPage}
                    setCurrentRakutenPage={setCurrentRakutenPage}
                  />
                )}
          </div>
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

  .productSearch__inputMainBox {
    margin: 20px 0;
    padding: 30px;
    background-color: #fff;
    border-radius: 20px;

    @media screen and (max-width: 425px) {
      padding: 18px;
    }
  }

  .productSearch__inputBox {
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 600px;

    @media screen and (max-width: 425px) {
      display: block;
    }

    input {
      width: 300px;

      @media screen and (max-width: 425px) {
        width: 100%;
      }
    }

    button {
      margin-left: 32px;

      @media screen and (max-width: 425px) {
        margin: 20px auto;
        display: block;
        width: 80%;
      }
    }
  }
`;

const resultBox = css`
  .resultBox__pc {
    display: flex;
    justify-content: space-between;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .resultBox__sp {
    display: none;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const tabBox = css`
  margin: 32px auto;
  width: 250px;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }

  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;
