import { memo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { DatePickerBox } from "@/components/elements/datePickerBox";
import { ButtonBox } from "@/components/elements/buttonBox";

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  timeLimit: Dayjs;
};

export const ModalProductTimeLimit = memo(
  ({ open, setOpen, timeLimit }: Props) => {
    const currentDate: Dayjs = dayjs();
    const selectDay = timeLimit.isBefore(currentDate);

    const [date, setDate] = useState<Dayjs | null>(
      selectDay ? currentDate : timeLimit
    );

    return (
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box css={editBox}>
          <h3>購入期日</h3>
          <DatePickerBox
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
          <ButtonBox>登録</ButtonBox>
        </Box>
      </Modal>
    );
  }
);

ModalProductTimeLimit.displayName = "ModalProductTimeLimit";

const editBox = css`
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

  .profilePictureInBox__uploadIcon {
    text-align: center;
    svg {
      width: 38px;
      height: 38px;
    }
  }
`;

const previewBox = css`
  margin: 12px auto;
  width: 260px;
  height: 250px;
  position: relative;

  @media (max-width: 425px) {
    width: 200px;
    height: 200px;
  }

  img {
    object-fit: cover;
    border-radius: 50%;
  }
`;
