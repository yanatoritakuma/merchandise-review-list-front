import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TError } from "@/types/error";
import { TResComments } from "@/types/comment";

export const useQueryComment = (
  page: number,
  pageSize: number,
  postId: number
) => {
  const getComments = async () => {
    const { data } = await axios.get<TResComments>(
      `${process.env.NEXT_PUBLIC_API_URL}/comment?page=${page}&pageSize=${pageSize}&postId=${postId}`
    );
    return data;
  };
  return useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
    onError: (err: TError) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error("コメントの取得に失敗しました。");
      }
    },
  });
};
