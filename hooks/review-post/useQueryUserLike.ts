import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TError } from "@/types/error";
import { TResReviewPost } from "@/types/reviewPost";

export const useQueryUserLike = (page: number, pageSize: number) => {
  const getUserLike = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const { data } = await axios.get<TResReviewPost>(
      `${process.env.NEXT_PUBLIC_API_URL}/reviewPosts/likes?page=${page}&pageSize=${pageSize}`
    );
    return data;
  };
  return useQuery({
    queryKey: ["userLike"],
    queryFn: getUserLike,
    onError: (err: TError) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error("いいねの投稿取得に失敗しました。");
      }
    },
  });
};
