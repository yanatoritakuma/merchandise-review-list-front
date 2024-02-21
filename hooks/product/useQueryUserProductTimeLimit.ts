import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TError } from "@/types/error";
import { TResProduct } from "@/types/product";

export const useQueryUserProductTimeLimit = (
  page: number,
  pageSize: number
) => {
  const getProductTimeLimit = async () => {
    const { data } = await axios.get<TResProduct>(
      `${process.env.NEXT_PUBLIC_API_URL}/product/timeLimit?page=${page}&pageSize=${pageSize}`
    );
    return data;
  };
  return useQuery({
    queryKey: ["productTimeLimit"],
    queryFn: getProductTimeLimit,
    onError: (err: TError) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error("カート期限情報の取得に失敗しました。");
      }
    },
  });
};
