import axios from "axios";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { BackdropContext } from "@/provider/backdropProvider";
import { MessageContext } from "@/provider/messageProvider";
import { TReqHouseholdBudgetEstimateItem } from "@/types/householdBudgetEstimateItem";

export const useMutatehouseholdBudgetEstimateItem = () => {
  const { setBackdropFlag } = useContext(BackdropContext);
  const { setMessage } = useContext(MessageContext);

  const householdBudgetEstimateItemMutation = useMutation(
    async (req: TReqHouseholdBudgetEstimateItem) =>
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/householdBudgetEstimateItem`,
        req
      ),
    {
      onSuccess: () => {
        setBackdropFlag(false);
        setMessage({
          text: "予算を作成しました。",
          type: "success",
        });
      },
      onError: () => {
        setBackdropFlag(false);
        setMessage({
          text: "予算の作成に失敗しました。",
          type: "error",
        });
      },
    }
  );

  return {
    householdBudgetEstimateItemMutation,
  };
};
