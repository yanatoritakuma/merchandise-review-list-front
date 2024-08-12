import axios from "axios";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { BackdropContext } from "@/provider/backdropProvider";
import { MessageContext } from "@/provider/messageProvider";
import { TReqHouseholdBudget } from "@/types/householdBudget";

export const useMutateHouseholdBudget = () => {
  const { setBackdropFlag } = useContext(BackdropContext);
  const { setMessage } = useContext(MessageContext);

  const householdBudgetMutation = useMutation(
    async (req: TReqHouseholdBudget) =>
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/householdBudget`,
        req
      ),
    {
      onSuccess: () => {
        setBackdropFlag(false);
        setMessage({
          text: "家計簿を作成しました。",
          type: "success",
        });
      },
      onError: () => {
        setBackdropFlag(false);
        setMessage({
          text: "家計簿の作成に失敗しました。",
          type: "error",
        });
      },
    }
  );

  return {
    householdBudgetMutation,
  };
};
