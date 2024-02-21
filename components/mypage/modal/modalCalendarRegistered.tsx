import { memo, useState } from "react";
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TResProduct } from "@/types/product";
import { ItemCart } from "@/components/mypage/itemCart";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import { TError } from "@/types/error";

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  productTimeLimit: TResProduct | undefined;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<TResProduct, TError>>;
};

export const ModalCalendarRegistered = memo(
  ({ open, setOpen, productTimeLimit, refetch }: Props) => {
    const initialMoreTextFlags = Array.from({ length: 20 }, () => false);

    //   todo:共通化したい
    const [moreTextFlag, setMoreTextFlag] = useState(initialMoreTextFlags);

    // useEffect(() => {
    //   refetch();
    //   setMoreTextFlag(initialMoreTextFlags);
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [currentPage]);

    return (
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box css={calendarRegisteredBox}>
          <h3>購入期日3日以内の商品</h3>
          {productTimeLimit?.products?.map((product, index) => (
            <ItemCart
              key={index}
              pr={product}
              index={index}
              refetch={refetch}
              moreTextFlag={moreTextFlag}
              setMoreTextFlag={setMoreTextFlag}
            />
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
  max-width: 1000px;
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
