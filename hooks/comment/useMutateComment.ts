import axios from "axios";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { BackdropContext } from "@/provider/backdropProvider";
import { MessageContext } from "@/provider/messageProvider";

type TReqComment = {
  text: string;
  post_id: number;
};

export const useMutateComment = () => {
  const { setBackdropFlag } = useContext(BackdropContext);
  const { setMessage } = useContext(MessageContext);

  const commentMutation = useMutation(
    async (reqComment: TReqComment) =>
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/comment`,
        reqComment
      ),
    {
      onSuccess: () => {
        setBackdropFlag(false);
        setMessage({
          text: "コメント追加しました。",
          type: "success",
        });
      },
      onError: () => {
        setBackdropFlag(false);
        setMessage({
          text: "コメント失敗しました。",
          type: "error",
        });
      },
    }
  );

  const commentDeleteMutation = useMutation(
    async (id: number) =>
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/comment/${id}`),
    {
      onSuccess: () => {
        setMessage({
          text: "コメントを削除しました。",
          type: "success",
        });
      },
      onError: () => {
        setMessage({
          text: "コメントの削除に失敗しました。",
          type: "error",
        });
      },
    }
  );

  return {
    commentMutation,
    commentDeleteMutation,
  };
};
