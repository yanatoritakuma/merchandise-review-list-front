import axios from "axios";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { BackdropContext } from "@/provider/backdropProvider";
import { MessageContext } from "@/provider/messageProvider";
import { TReqProduct } from "@/types/product";

export const useMutateProduct = () => {
  const { setBackdropFlag } = useContext(BackdropContext);
  const { setMessage } = useContext(MessageContext);

  const productMutation = useMutation(
    async (reqProduct: TReqProduct) =>
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/product`,
        reqProduct
      ),
    {
      onSuccess: () => {
        setBackdropFlag(false);
        setMessage({
          text: "カートにいれました。",
          type: "success",
        });
      },
      onError: () => {
        setBackdropFlag(false);
        setMessage({
          text: "カートに失敗しました。",
          type: "error",
        });
      },
    }
  );

  const deleteProductMutation = useMutation(
    async (id: number) =>
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`),
    {
      onSuccess: () => {
        setBackdropFlag(false);
        setMessage({
          text: "カートから削除しました。",
          type: "success",
        });
      },
      onError: () => {
        setBackdropFlag(false);
        setMessage({
          text: "カートの削除に失敗しました。",
          type: "error",
        });
      },
    }
  );

  return { productMutation, deleteProductMutation };
};
