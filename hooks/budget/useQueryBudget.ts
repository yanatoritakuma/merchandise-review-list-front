import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TError } from "@/types/error";
import { TResBudget } from "@/types/budget";

export const useQueryBudget = (year: number, month: number | "all") => {
  const getBudget = async () => {
    const { data } = await axios.get<TResBudget>(
      `${process.env.NEXT_PUBLIC_API_URL}/budget/budgetByUserId?year=${year}&month=${month}`
    );
    return data;
  };
  return useQuery({
    queryKey: ["budget"],
    queryFn: getBudget,
    onError: (err: TError) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error("予算の取得に失敗しました。");
      }
    },
  });
};
