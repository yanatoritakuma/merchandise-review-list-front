import { memo } from "react";
import { css } from "@emotion/react";
import { TextBox } from "@/components/elements/textBox";

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
};

export const SearchOption = memo(({ price, setPrice }: Props) => {
  return (
    <div css={optionBox}>
      <div className="optionBox__textBox">
        <TextBox
          label="最小価格"
          value={price.min}
          onChange={(e) =>
            setPrice({
              ...price,
              min: e.target.value,
            })
          }
        />
      </div>
      <span>〜</span>
      <div className="optionBox__textBox">
        <TextBox
          label="最大価格"
          value={price.max}
          onChange={(e) =>
            setPrice({
              ...price,
              max: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
});

SearchOption.displayName = "SearchOption";

const optionBox = css`
  display: flex;
  justify-content: center;
  align-items: center;

  .optionBox__textBox {
    margin: 0 20px;
  }
`;
