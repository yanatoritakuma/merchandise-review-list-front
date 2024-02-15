import { memo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { DatePickerBox } from "@/components/elements/datePickerBox";
import { ButtonBox } from "@/components/elements/buttonBox";
import { useMutateProduct } from "@/hooks/product/useMutateProduct";

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  timeLimit: Dayjs;
  productId: number;
};

export const ModalProductTimeLimit = memo(
  ({ open, setOpen, timeLimit, productId }: Props) => {
    const cutoffDate: Dayjs = dayjs("1990-01-01");
    const pastDate = timeLimit.isBefore(cutoffDate);
    const [date, setDate] = useState<Dayjs | null>(pastDate ? null : timeLimit);
    const { updateProductMutation } = useMutateProduct();

    const onClickUpdateProduct = () => {
      const reqProduct = {
        productId: productId,
        timeLimit: date,
      };
      updateProductMutation.mutate(reqProduct);
      setOpen(false);
    };

    const onClickResetProduct = () => {
      const reqProduct = {
        productId: productId,
        timeLimit: null,
      };
      updateProductMutation.mutate(reqProduct);
      setOpen(false);
    };

    return (
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box css={timeLimitBox}>
          <h3>購入期日</h3>
          <DatePickerBox
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
          <ButtonBox onClick={() => onClickUpdateProduct()}>登録</ButtonBox>
          {date !== null && (
            <ButtonBox onClick={() => onClickResetProduct()}>
              リセット
            </ButtonBox>
          )}
        </Box>
      </Modal>
    );
  }
);

ModalProductTimeLimit.displayName = "ModalProductTimeLimit";

const timeLimitBox = css`
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  height: auto;
  max-height: 90vh;
  background-color: #fff;
  border: 1px solid #333;
  border-radius: 10px;
  overflow-y: scroll;

  h3 {
    text-align: center;
  }

  button {
    margin: 20px auto;
    display: block;
  }
`;
