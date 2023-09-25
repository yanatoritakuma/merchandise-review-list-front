import axios from "axios";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { BackdropContext } from "@/provider/backdropProvider";
import { MessageContext } from "@/provider/messageProvider";
import { TReqReviewPostMutation } from "@/types/reviewPost";

export const useMutateReviewPost = () => {
  const { setBackdropFlag } = useContext(BackdropContext);
  const { setMessage } = useContext(MessageContext);

  const reviewPostMutation = useMutation(
    async (reqReviewPosts: TReqReviewPostMutation) =>
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/reviewPosts`,
        reqReviewPosts
      ),
    {
      onSuccess: () => {
        setBackdropFlag(false);
        setMessage({
          text: "登録完了",
          type: "success",
        });
      },
      onError: () => {
        setBackdropFlag(false);
        setMessage({
          text: "登録失敗しました。",
          type: "error",
        });
      },
    }
  );

  const updateReviewPostMutation = useMutation(
    async (reqReviewPosts: TReqReviewPostMutation) =>
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/reviewPosts/${reqReviewPosts.id}`,
        reqReviewPosts
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

  return { reviewPostMutation, updateReviewPostMutation };
};
