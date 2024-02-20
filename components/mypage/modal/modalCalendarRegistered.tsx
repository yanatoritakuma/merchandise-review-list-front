import { memo } from "react";
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TResProductTimeLimit } from "@/types/product";

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  productTimeLimit: TResProductTimeLimit | undefined;
};

export const ModalCalendarRegistered = memo(
  ({ open, setOpen, productTimeLimit }: Props) => {
    return (
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box css={calendarRegisteredBox}>
          <h3>購入期日3日以内の商品</h3>
          {productTimeLimit?.productsTimeLimit?.map((product) => (
            <div key={product.id}>
              <h4>{product.name}</h4>
            </div>
          ))}
        </Box>
      </Modal>
    );
  }
);

ModalCalendarRegistered.displayName = "ModalCalendarRegistered";

const calendarRegisteredBox = css`
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
`;
