import { memo, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { Modal } from "@mui/material";
import { TextBox } from "@/components/elements/textBox";
import { SelectBox } from "@/components/elements/selectBox";
import { monthMenuItem, yearMenuItem } from "@/constants/dateMenuItem";

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  year: string;
  month: string;
};

export const ModalEstimate = memo(({ open, setOpen, year, month }: Props) => {
  const [inputEstimate, setInputEstimate] = useState({
    year: year,
    month: month,
  });
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div css={modalEstimateBox}>
        <div css={dateBox}>
          <div css={dateBox__selectBox}>
            <SelectBox
              label="設定年"
              value={inputEstimate.year}
              onChange={(e) =>
                setInputEstimate({
                  ...inputEstimate,
                  year: e.target?.value,
                })
              }
              menuItem={yearMenuItem}
            />
          </div>
          <div css={dateBox__selectBox}>
            <SelectBox
              label="設定月"
              value={inputEstimate.month}
              onChange={(e) =>
                setInputEstimate({
                  ...inputEstimate,
                  month: e.target?.value,
                })
              }
              menuItem={monthMenuItem}
            />
          </div>
        </div>

        <div>
          <TextBox
            label={""}
            value={""}
            onChange={function (
              event: React.ChangeEvent<HTMLInputElement>
            ): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>

        <div css={totalPriceBox}>
          <h4 className="totalPriceBox__text">合計金額</h4>
        </div>
      </div>
    </Modal>
  );
});

ModalEstimate.displayName = "ModalEstimate";

const modalEstimateBox = css`
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 800px;
  height: auto;
  max-height: 90vh;
  background-color: #fff;
  border: 1px solid #aaa;
  border-radius: 10px;
  overflow-y: scroll;
`;

const dateBox = css`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const dateBox__selectBox = css`
  width: 40%;
`;

const totalPriceBox = css`
  display: flex;
  align-items: center;

  .totalPriceBox__text {
    font-size: 20px;
    margin-right: 6px;
  }

  .totalPriceBox__price {
    font-size: 24px;
  }

  .totalPriceBox__price_error {
    color: #e9546b;
    font-size: 16px;
  }
`;
