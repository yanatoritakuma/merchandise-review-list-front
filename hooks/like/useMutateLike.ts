import axios from "axios";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { MessageContext } from "@/provider/messageProvider";

export type TReqLike = {
  post_id: number;
};

export const useMutateLike = () => {
  const { setMessage } = useContext(MessageContext);

  const likeMutation = useMutation(
    async (reqLike: TReqLike) =>
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/like`, reqLike),
    {
      onSuccess: () => {
        setMessage({
          text: "いいねしました。",
          type: "success",
        });
      },
      onError: () => {
        setMessage({
          text: "いいね失敗しました。",
          type: "error",
        });
      },
    }
  );

  const likeDeleteMutation = useMutation(
    async (id: number) =>
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/like/${id}`),
    {
      onSuccess: () => {
        setMessage({
          text: "いいね取り消ししました。",
          type: "success",
        });
      },
      onError: () => {
        setMessage({
          text: "いいね取り消しに失敗しました。",
          type: "error",
        });
      },
    }
  );

  return { likeMutation, likeDeleteMutation };
};
