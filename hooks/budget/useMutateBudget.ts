import axios from "axios";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { BackdropContext } from "@/provider/backdropProvider";
import { MessageContext } from "@/provider/messageProvider";
import { TReqBudget } from "@/types/budget";
import { TResponseError } from "@/types/responseError";

export const useMutateBudget = () => {
  const { setBackdropFlag } = useContext(BackdropContext);
  const { setMessage } = useContext(MessageContext);

  const budgetMutation = useMutation(
    async (reqBudget: TReqBudget) =>
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/budget`, reqBudget),
    {
      onSuccess: () => {
        setBackdropFlag(false);
        setMessage({
          text: "予算金額を設定しました。",
          type: "success",
        });
      },
      onError: (error: TResponseError) => {
        if (error.response.data === "duplicate budget") {
          setBackdropFlag(false);
          setMessage({
            text: "既に設定されている年月です。",
            type: "error",
          });
        } else {
          setBackdropFlag(false);
          setMessage({
            text: "予算金額設定に失敗しました。",
            type: "error",
          });
        }
      },
    }
  );

  return {
    budgetMutation,
  };
};
