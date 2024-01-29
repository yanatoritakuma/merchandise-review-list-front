import { memo } from "react";
import { css } from "@emotion/react";
import { TextBox } from "@/components/elements/textBox";
import { RadioBox } from "@/components/elements/radioBox";

type Props = {
  price: {
    min: string;
    max: string;
    searchmMinPrice: string;
    searchmMaxPrice: string;
  };
  setPrice: React.Dispatch<
    React.SetStateAction<{
      min: string;
      max: string;
      searchmMinPrice: string;
      searchmMaxPrice: string;
    }>
  >;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchOption = memo(
  ({ price, setPrice, sort, setSort }: Props) => {
    return (
      <div css={optionBox}>
        <div className="optionBox__textMainBox">
          <div className="optionBox__textBox">
            <TextBox
              label="最小価格"
              value={price.min}
              onChange={(e) =>
                setPrice({
                  ...price,
                  min: e.target.value.replace(/\s/g, ""),
                })
              }
            />
          </div>
          <span className="optionBox__textBoxText">〜</span>
          <div className="optionBox__textBox">
            <TextBox
              label="最大価格"
              value={price.max}
              onChange={(e) =>
                setPrice({
                  ...price,
                  max: e.target.value.replace(/\s/g, ""),
                })
              }
            />
          </div>
        </div>
        <div>
          <p>並び替え</p>
          <RadioBox
            labels={[
              "通常",
              "価格の安い順",
              "価格の高い順",
              "商品レビュー数の多い順",
            ]}
            radioValues={["standard", "plusPrice", "minusPrice", "reviewCount"]}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          />
        </div>
      </div>
    );
  }
);

SearchOption.displayName = "SearchOption";

const optionBox = css`
  .optionBox__textMainBox {
    margin: 20px 0;
    display: flex;
    align-items: center;

    @media (max-width: 425px) {
      display: block;
      text-align: center;

      .optionBox__textBoxText {
        margin: 10px 0;
        writing-mode: vertical-rl;
      }
    }
  }

  .optionBox__textBox {
    margin: 0 20px;
  }
`;
