import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TError } from "@/types/error";
import { TResProductYearMonth } from "@/types/product";

export const useQueryUserProductTimeLimitYearMonth = (yearMonth: number) => {
  const getProductTimeLimit = async () => {
    const { data } = await axios.get<TResProductYearMonth>(
      `${process.env.NEXT_PUBLIC_API_URL}/product/timeLimitYearMonth?yearMonth=${yearMonth}`
    );
    return data;
  };
  return useQuery({
    queryKey: ["productTimeLimitYearMonth"],
    queryFn: getProductTimeLimit,
    onError: (err: TError) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error("購入期日の取得に失敗しました。");
      }
    },
  });
};
