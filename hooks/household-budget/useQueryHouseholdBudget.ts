import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TError } from "@/types/error";
import { TResHouseholdBudget } from "@/types/householdBudget";

export const useQueryHouseholdBudget = (page: number, pageSize: number) => {
  const getHouseholdBudgets = async () => {
    const { data } = await axios.get<TResHouseholdBudget>(
      `${process.env.NEXT_PUBLIC_API_URL}/householdBudget?page=${page}&pageSize=${pageSize}`
    );
    return data;
  };

  return useQuery({
    queryKey: ["householdBudgets"],
    queryFn: getHouseholdBudgets,
    onError: (err: TError) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error("家計簿リストの取得に失敗しました。");
      }
    },
  });
};
