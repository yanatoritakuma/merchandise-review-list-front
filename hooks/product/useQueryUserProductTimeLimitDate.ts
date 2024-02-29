import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TError } from "@/types/error";
import { TResProduct } from "@/types/product";

export const useQueryUserProductTimeLimitDate = (
  page: number,
  pageSize: number,
  date: number
) => {
  const getProductTimeLimit = async () => {
    const { data } = await axios.get<TResProduct>(
      `${process.env.NEXT_PUBLIC_API_URL}/product/timeLimitDate?page=${page}&pageSize=${pageSize}&date=${date}`
    );
    return data;
  };
  return useQuery({
    queryKey: ["productTimeLimitDate"],
    queryFn: getProductTimeLimit,
    onError: (err: TError) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error("購入期日のデータ取得に失敗しました。");
      }
    },
  });
};
