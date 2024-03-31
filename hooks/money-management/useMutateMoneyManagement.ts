import axios from "axios";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { BackdropContext } from "@/provider/backdropProvider";
import { MessageContext } from "@/provider/messageProvider";
import { TReqMoneyManagementMutation } from "@/types/moneyManagement";

export const useMutateMoneyManagement = () => {
  const { setBackdropFlag } = useContext(BackdropContext);
  const { setMessage } = useContext(MessageContext);

  const moneyManagementMutation = useMutation(
    async (reqMoneyManagement: TReqMoneyManagementMutation) =>
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/moneyManagement`,
        reqMoneyManagement
      ),
    {
      onSuccess: () => {
        setBackdropFlag(false);
        setMessage({
          text: "金額管理に追加しました。",
          type: "success",
        });
      },
      onError: () => {
        setBackdropFlag(false);
        setMessage({
          text: "金額管理の追加に失敗しました。",
          type: "error",
        });
      },
    }
  );

  const updateMoneyManagementMutation = useMutation(
    async (reqMoneyManagement: TReqMoneyManagementMutation) =>
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/moneyManagement/${reqMoneyManagement.id}`,
        reqMoneyManagement
      ),
    {
      onSuccess: () => {
        setBackdropFlag(false);
        setMessage({
          text: "編集完了",
          type: "success",
        });
      },
      onError: () => {
        setBackdropFlag(false);
        setMessage({
          text: "編集失敗しました。",
          type: "error",
        });
      },
    }
  );

  return {
    moneyManagementMutation,
    updateMoneyManagementMutation,
  };
};
