import { memo, useState } from "react";
import { css } from "@emotion/react";
import { Modal } from "@mui/material";
import { TextBox } from "@/components/elements/textBox";
import { SelectBox } from "@/components/elements/selectBox";
import { monthMenuItem, yearMenuItem } from "@/constants/dateMenuItem";
import { categoryMenuItem } from "@/constants/categoryMenuItem";
import { ButtonBox } from "@/components/elements/buttonBox";
import { useMutateBudget } from "@/hooks/budget/useMutateBudget";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ChairIcon from "@mui/icons-material/Chair";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PaletteIcon from "@mui/icons-material/Palette";
import WbIncandescentIcon from "@mui/icons-material/WbIncandescent";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  setUpdateFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalInputBudget = memo(
  ({ open, setOpen, setUpdateFlag }: Props) => {
    const { budgetMutation } = useMutateBudget();
    const [inputBudget, setInputBudget] = useState({
      month: "",
      year: "",
      totalPrice: "",
      food: "",
      drink: "",
      book: "",
      fashion: "",
      furniture: "",
      gamesToys: "",
      beauty: "",
      everyDayItems: "",
      other: "",
    });

    const onClose = () => {
      setOpen(false);
    };

    const onClickSetBudget = () => {
      const reqInputBudget = {
        month: inputBudget.month,
        year: inputBudget.year,
        total_price: Number(inputBudget.totalPrice),
        food: Number(inputBudget.food),
        drink: Number(inputBudget.drink),
        book: Number(inputBudget.book),
        fashion: Number(inputBudget.fashion),
        furniture: Number(inputBudget.furniture),
        games_toys: Number(inputBudget.gamesToys),
        beauty: Number(inputBudget.beauty),
        every_dayItems: Number(inputBudget.everyDayItems),
        other: Number(inputBudget.other),
      };

      budgetMutation.mutate(reqInputBudget);
      setInputBudget({
        month: "",
        year: "",
        totalPrice: "",
        food: "",
        drink: "",
        book: "",
        fashion: "",
        furniture: "",
        gamesToys: "",
        beauty: "",
        everyDayItems: "",
        other: "",
      });
    };

    const onBlurInputBudget = () => {
      const total =
        Number(inputBudget.food) +
        Number(inputBudget.drink) +
        Number(inputBudget.book) +
        Number(inputBudget.fashion) +
        Number(inputBudget.furniture) +
        Number(inputBudget.gamesToys) +
        Number(inputBudget.beauty) +
        Number(inputBudget.everyDayItems) +
        Number(inputBudget.other);

      setInputBudget({ ...inputBudget, totalPrice: String(total) });
    };

    return (
      <Modal open={open} onClose={onClose}>
        <div css={modalInputBudgetBox}>
          <div css={dateBox}>
            <div css={dateBox__selectBox}>
              <SelectBox
                label="設定年"
                value={inputBudget.year}
                onChange={(e) =>
                  setInputBudget({
                    ...inputBudget,
                    year: e.target?.value,
                  })
                }
                menuItem={yearMenuItem}
              />
            </div>
            <div css={dateBox__selectBox}>
              <SelectBox
                label="設定月"
                value={inputBudget.month}
                onChange={(e) =>
                  setInputBudget({
                    ...inputBudget,
                    month: e.target?.value,
                  })
                }
                menuItem={monthMenuItem}
              />
            </div>
          </div>

          <div css={totalPriceBox}>
            <h4 className="totalPriceBox__text">合計金額</h4>
            <span className="totalPriceBox__price">
              ¥{Number(inputBudget.totalPrice).toLocaleString()}
            </span>
          </div>

          <div css={textBox}>
            <RestaurantIcon className="textBox__icon textBox__icon--food" />

            <TextBox
              label={categoryMenuItem[0].item}
              value={inputBudget.food}
              onChange={(e) =>
                setInputBudget({
                  ...inputBudget,
                  food: e.target?.value,
                })
              }
              onBlur={onBlurInputBudget}
            />
          </div>

          <div css={textBox}>
            <LocalDrinkIcon className="textBox__icon textBox__icon--drink" />

            <TextBox
              label={categoryMenuItem[1].item}
              value={String(inputBudget.drink)}
              onChange={(e) =>
                setInputBudget({
                  ...inputBudget,
                  drink: e.target?.value,
                })
              }
              onBlur={onBlurInputBudget}
            />
          </div>

          <div css={textBox}>
            <MenuBookIcon className="textBox__icon textBox__icon--book" />
            <TextBox
              label={categoryMenuItem[2].item}
              value={String(inputBudget.book)}
              onChange={(e) =>
                setInputBudget({
                  ...inputBudget,
                  book: e.target?.value,
                })
              }
              onBlur={onBlurInputBudget}
            />
          </div>

          <div css={textBox}>
            <CheckroomIcon className="textBox__icon textBox__icon--fashion" />

            <TextBox
              label={categoryMenuItem[3].item}
              value={String(inputBudget.fashion)}
              onChange={(e) =>
                setInputBudget({
                  ...inputBudget,
                  fashion: e.target?.value,
                })
              }
              onBlur={onBlurInputBudget}
            />
          </div>

          <div css={textBox}>
            <ChairIcon className="textBox__icon textBox__icon--furniture" />

            <TextBox
              label={categoryMenuItem[4].item}
              value={String(inputBudget.furniture)}
              onChange={(e) =>
                setInputBudget({
                  ...inputBudget,
                  furniture: e.target?.value,
                })
              }
              onBlur={onBlurInputBudget}
            />
          </div>

          <div css={textBox}>
            <SportsEsportsIcon className="textBox__icon textBox__icon--gamesToys" />
            <TextBox
              label={categoryMenuItem[5].item}
              value={String(inputBudget.gamesToys)}
              onChange={(e) =>
                setInputBudget({
                  ...inputBudget,
                  gamesToys: e.target?.value,
                })
              }
              onBlur={onBlurInputBudget}
            />
          </div>

          <div css={textBox}>
            <PaletteIcon className="textBox__icon textBox__icon--beauty" />
            <TextBox
              label={categoryMenuItem[6].item}
              value={String(inputBudget.beauty)}
              onChange={(e) =>
                setInputBudget({
                  ...inputBudget,
                  beauty: e.target?.value,
                })
              }
              onBlur={onBlurInputBudget}
            />
          </div>

          <div css={textBox}>
            <WbIncandescentIcon className="textBox__icon textBox__icon--everyDayItems" />
            <TextBox
              label={categoryMenuItem[7].item}
              value={String(inputBudget.everyDayItems)}
              onChange={(e) =>
                setInputBudget({
                  ...inputBudget,
                  everyDayItems: e.target?.value,
                })
              }
              onBlur={onBlurInputBudget}
            />
          </div>
          <div css={textBox}>
            <AddCircleOutlineIcon className="textBox__icon textBox__icon--other" />
            <TextBox
              label={categoryMenuItem[8].item}
              value={String(inputBudget.other)}
              onChange={(e) =>
                setInputBudget({
                  ...inputBudget,
                  other: e.target?.value,
                })
              }
              onBlur={onBlurInputBudget}
            />
          </div>
          <ButtonBox onClick={() => onClickSetBudget()} css={setBuuton}>
            登録
          </ButtonBox>
        </div>
      </Modal>
    );
  }
);

ModalInputBudget.displayName = "ModalInputBudget";

const modalInputBudgetBox = css`
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
`;

const textBox = css`
  margin: 12px 0;
  display: flex;
  align-items: center;

  .textBox__icon {
    margin-right: 6px;
  }

  .textBox__icon--food {
    color: #fe4c00;
  }
  .textBox__icon--drink {
    color: #4357f2;
  }
  .textBox__icon--book {
    color: #bb5520;
  }
  .textBox__icon--fashion {
    color: #f6c103;
  }
  .textBox__icon--furniture {
    color: #38b48b;
  }
  .textBox__icon--gamesToys {
    color: #888888;
  }
  .textBox__icon--beauty {
    color: #e198b4;
  }
  .textBox__icon--everyDayItems {
    color: #1e50a2;
  }
  .textBox__icon--other {
    color: #432f2f;
  }
`;

const setBuuton = css`
  margin: 20px auto;
  width: 50%;
  display: block;
`;
