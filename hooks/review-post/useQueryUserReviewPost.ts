import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TError } from "@/types/error";
import { TResReviewPost } from "@/types/reviewPost";

export const useQueryUserReviewPost = (page: number, pageSize: number) => {
  const getUserReviewPost = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const { data } = await axios.get<TResReviewPost>(
      `${process.env.NEXT_PUBLIC_API_URL}/reviewPosts/userReviewPosts?page=${page}&pageSize=${pageSize}`
    );
    return data;
  };
  return useQuery({
    queryKey: ["userReviewPost"],
    queryFn: getUserReviewPost,
    onError: (err: TError) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error("レビュー投稿の取得に失敗しました。");
      }
    },
  });
};
