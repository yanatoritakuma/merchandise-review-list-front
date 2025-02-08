import { useMutateHouseholdBudget } from "@/hooks/household-budget/useMutateHouseholdBudget";
import { css } from "@emotion/react";
import { memo, useState } from "react";
import { ButtonBox } from "@/components/elements/buttonBox";
import { TextBox } from "@/components/elements/textBox";
import { Modal } from "@mui/material";
import { HouseholdBudgetValidation } from "@/utils/validations/householdBudget";

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
};

export const ModalCreateHouseholdBudget = memo(({ open, setOpen }: Props) => {
  const { householdBudgetMutation } = useMutateHouseholdBudget();
  const { householdBudgetValidation } = HouseholdBudgetValidation();
  const [title, setTitle] = useState("");

  const onClose = () => {
    setOpen(false);
  };

  const onClickCreateHouseholdBudget = () => {
    const reqHouseholdBudget = {
      title: title,
    };

    try {
      householdBudgetMutation.mutate(reqHouseholdBudget);
      setTitle("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div css={createHouseholdBudget}>
        <h2>家計簿を作成する</h2>
        <TextBox
          label="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ButtonBox
          onClick={() =>
            householdBudgetValidation(title) && onClickCreateHouseholdBudget()
          }
        >
          作成
        </ButtonBox>
      </div>
    </Modal>
  );
});

ModalCreateHouseholdBudget.displayName = "ModalCreateHouseholdBudget";

const createHouseholdBudget = css`
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
