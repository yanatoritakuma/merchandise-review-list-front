import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TError } from "@/types/error";
import { TResMoneyManagement } from "@/types/moneyManagement";

export const useQueryGetMyMoneyManagements = (
  yearMonth: number,
  yearFlag: boolean
) => {
  const getProductTimeLimit = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const { data } = await axios.get<TResMoneyManagement>(
      `${process.env.NEXT_PUBLIC_API_URL}/moneyManagement?yearMonth=${yearMonth}&yearFlag=${yearFlag}`
    );
    return data;
  };
  return useQuery({
    queryKey: ["moneyManagements"],
    queryFn: getProductTimeLimit,
    onError: (err: TError) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error("金額管理データの取得に失敗しました。");
      }
    },
  });
};
