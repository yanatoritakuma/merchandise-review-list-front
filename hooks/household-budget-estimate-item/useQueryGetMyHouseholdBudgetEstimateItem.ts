import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TError } from "@/types/error";

export const useQueryGetMyHouseholdBudgetEstimateItem = (
  householdBudgetId: number,
  year: number,
  month: number
) => {
  const getBudget = async () => {
    const { data } = await axios.get<any>(
      `${process.env.NEXT_PUBLIC_API_URL}/householdBudgetEstimateItem?householdBudgetId=${householdBudgetId}&year=${year}&month=${month}`
    );
    return data;
  };
  return useQuery({
    queryKey: ["getMyHouseholdBudgetEstimateItem"],
    queryFn: getBudget,
    enabled: !isNaN(householdBudgetId),
    onError: (err: TError) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error("予算の取得に失敗しました。");
      }
    },
  });
};
