import { memo, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { Modal } from "@mui/material";
import { TextBox } from "@/components/elements/textBox";
import { DatePickerBox } from "@/components/elements/datePickerBox";
import dayjs, { Dayjs } from "dayjs";
import { SelectBox } from "@/components/elements/selectBox";
import { categoryMenuItem } from "@/constants/categoryMenuItem";
import { ButtonBox } from "@/components/elements/buttonBox";
import { purchaseQuantityItem } from "@/constants/purchaseQuantityItem";
import CurrencyYuanIcon from "@mui/icons-material/CurrencyYuan";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import RedeemIcon from "@mui/icons-material/Redeem";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { MoneyManagementValidation } from "@/utils/validations/moneyManagementValidation";
import {
  TManagementRowData,
  TReqMoneyManagementMutation,
} from "@/types/moneyManagement";
import { useMutateMoneyManagement } from "@/hooks/money-management/useMutateMoneyManagement";
import { ConfirmButtonBox } from "@/components/elements/confirmButtonBox";

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  setUpdateFlag: React.Dispatch<React.SetStateAction<boolean>>;
  updateManagement: TManagementRowData | null;
  modalUpdateFlag: boolean;
  setModalUpdateFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

type TInputManagement = {
  id: number;
  title: string;
  category: string;
  unitPrice: string;
  quantity: string;
  totalPrice: string;
};

export const ModalInputManagement = memo(
  ({
    open,
    setOpen,
    setUpdateFlag,
    updateManagement,
    modalUpdateFlag,
    setModalUpdateFlag,
  }: Props) => {
    const { moneyManagementRegisterValidation } = MoneyManagementValidation();
    const {
      moneyManagementMutation,
      updateMoneyManagementMutation,
      deleteMoneyManagementMutation,
    } = useMutateMoneyManagement();
    const now = dayjs(); // 現在の日時を取得
    const [date, setDate] = useState<Dayjs | null>(now);
    const [inputManagement, setInputManagement] = useState<TInputManagement>({
      id: 0,
      title: "",
      category: "",
      unitPrice: "",
      quantity: "",
      totalPrice: "",
    });

    useEffect(() => {
      const toatal =
        Number(inputManagement.unitPrice) * Number(inputManagement.quantity);
      setInputManagement({ ...inputManagement, totalPrice: String(toatal) });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputManagement.unitPrice, inputManagement.quantity]);

    const convertDate = (dateStr: string) => {
      // 日本語の日付文字列をハイフンで分割し、年月日を取得する
      const [year, month, day] = dateStr.split(/[年月日]/);

      // 各部分を2桁の数字にフォーマットし、'-'で結合する
      const formattedDateStr = `${year}-${month.padStart(
        2,
        "0"
      )}-${day.padStart(2, "0")}`;

      return formattedDateStr;
    };

    useEffect(() => {
      if (updateManagement !== null) {
        setInputManagement({
          id: updateManagement.id,
          title: updateManagement.name,
          category: updateManagement.category,
          unitPrice: String(updateManagement.unitPrice),
          quantity: String(updateManagement.quantity),
          totalPrice: String(updateManagement.totalPrice),
        });

        setDate(dayjs(convertDate(updateManagement.date)));
      }
    }, [updateManagement]);

    const onClose = () => {
      setOpen(false);
      setInputManagement({
        id: 0,
        title: "",
        category: "",
        unitPrice: "",
        quantity: "",
        totalPrice: "",
      });
      setDate(now);
      setModalUpdateFlag(false);
    };

    const onClickMoneyManagementRegister = () => {
      const reqMoneyManagementMutation: TReqMoneyManagementMutation = {
        title: inputManagement.title,
        category: inputManagement.category,
        quantity: Number(inputManagement.quantity),
        unit_price: Number(inputManagement.unitPrice),
        total_price: Number(inputManagement.totalPrice),
        updated_at: String(date?.toISOString()), // ISO 8601形式の文字列に変換
      };

      if (moneyManagementRegisterValidation(reqMoneyManagementMutation)) {
        moneyManagementMutation.mutate(reqMoneyManagementMutation);

        setInputManagement({
          id: 0,
          title: "",
          category: "",
          unitPrice: "",
          quantity: "",
          totalPrice: "",
        });

        setUpdateFlag(true);
      }
    };

    const onClickMoneyManagementUpdate = async () => {
      const reqMoneyManagementMutation: TReqMoneyManagementMutation = {
        id: inputManagement.id,
        title: inputManagement.title,
        category: inputManagement.category,
        quantity: Number(inputManagement.quantity),
        unit_price: Number(inputManagement.unitPrice),
        total_price: Number(inputManagement.totalPrice),
        updated_at: String(date?.toISOString()), // ISO 8601形式の文字列に変換
      };

      if (moneyManagementRegisterValidation(reqMoneyManagementMutation)) {
        try {
          await updateMoneyManagementMutation.mutateAsync({
            id: reqMoneyManagementMutation.id,
            title: reqMoneyManagementMutation.title,
            category: reqMoneyManagementMutation.category,
            quantity: reqMoneyManagementMutation.quantity,
            unit_price: reqMoneyManagementMutation.unit_price,
            total_price: reqMoneyManagementMutation.total_price,
            updated_at: reqMoneyManagementMutation.updated_at,
          });
          setUpdateFlag(true);
        } catch (err) {
          console.error("err", err);
        }
      }
    };

    const onClickDeleteMoneyManagement = () => {
      try {
        deleteMoneyManagementMutation.mutateAsync(inputManagement.id);
        setUpdateFlag(true);
      } catch (err) {
        console.log("err", err);
      }
    };

    return (
      <Modal open={open} onClose={onClose}>
        <div css={modalInputManagementBox}>
          <div className="modalInputManagementBox__inputBox">
            <span className="modalInputManagementBox__inputIconBox">
              <CurrencyYuanIcon />
            </span>
            <TextBox
              label="値段"
              value={inputManagement.unitPrice}
              onChange={(e) =>
                setInputManagement({
                  ...inputManagement,
                  unitPrice: e.target?.value,
                })
              }
              fullWidth
            />
          </div>
          <div className="modalInputManagementBox__inputBox">
            <span className="modalInputManagementBox__inputIconBox">
              <CalendarMonthIcon />
            </span>
            <div className="modalInputManagementBox__dateBox">
              <DatePickerBox value={date} onChange={(e) => setDate(e)} />
            </div>
          </div>
          <div className="modalInputManagementBox__inputBox">
            <span className="modalInputManagementBox__inputIconBox">
              <RedeemIcon />
            </span>
            <TextBox
              label="商品名"
              value={inputManagement.title}
              onChange={(e) =>
                setInputManagement({
                  ...inputManagement,
                  title: e.target.value,
                })
              }
              fullWidth
            />
          </div>
          <div className="modalInputManagementBox__inputBox">
            <span className="modalInputManagementBox__inputIconBox">
              <LocalOfferIcon />
            </span>
            <SelectBox
              label="カテゴリー"
              value={inputManagement.category}
              menuItem={categoryMenuItem}
              onChange={(e) =>
                setInputManagement({
                  ...inputManagement,
                  category: e.target.value,
                })
              }
            />
          </div>
          <div className="modalInputManagementBox__inputBox">
            <span className="modalInputManagementBox__inputIconBox">
              <ProductionQuantityLimitsIcon />
            </span>
            <SelectBox
              label="個数"
              value={inputManagement.quantity}
              menuItem={purchaseQuantityItem(100)}
              onChange={(e) =>
                setInputManagement({
                  ...inputManagement,
                  quantity: e.target.value,
                })
              }
            />
          </div>
          {!Number.isNaN(Number(inputManagement.totalPrice)) ? (
            <span className="modalInputManagementBox__totalPrice">
              合計金額:{Number(inputManagement.totalPrice).toLocaleString()}円
            </span>
          ) : (
            <span className="modalInputManagementBox__totalPrice ng">
              値段には半角数字で入力してください。
            </span>
          )}

          {!modalUpdateFlag ? (
            <span className="modalInputManagementBox__btnBox">
              <ButtonBox onClick={() => onClickMoneyManagementRegister()}>
                登録
              </ButtonBox>
            </span>
          ) : (
            <span className="modalInputManagementBox__btnBox">
              <ButtonBox onClick={() => onClickMoneyManagementUpdate()}>
                更新
              </ButtonBox>

              <ConfirmButtonBox
                dialogTitle="本当に削除しますか？"
                dialogContentText="この操作は取り消しできません。"
                decisionText="削除"
                cancelText="やめる"
                decisionColor="error"
                onClick={() => onClickDeleteMoneyManagement()}
                className="deleteBtn"
              >
                削除
              </ConfirmButtonBox>
            </span>
          )}
        </div>
      </Modal>
    );
  }
);

ModalInputManagement.displayName = "ModalInputManagement";

const modalInputManagementBox = css`
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

  .modalInputManagementBox__inputBox {
    margin: 24px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .modalInputManagementBox__inputIconBox {
      margin-right: 24px;
    }
  }

  .modalInputManagementBox__dateBox {
    width: 100%;
  }

  .modalInputManagementBox__btnBox {
    button {
      margin: 20px auto;
      display: block;
      width: 50%;
    }

    .deleteBtn {
      background-color: #e9546b;
    }
  }

  .modalInputManagementBox__totalPrice {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    display: block;
  }

  .ng {
    color: #e9546b;
  }
`;
