import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TYahooProducts } from "@/types/yahoo";

export const useQueryYahoo = (search: string, page: number) => {
  const getYahoo = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const { data } = await axios.get<TYahooProducts>("/api/yahoo", {
      params: {
        search: search,
        page: page,
      },
    });
    return data;
  };
  return useQuery({
    queryKey: ["yahoo"],
    queryFn: getYahoo,
    // suspense: true,
    onError: (err: any) => {
      console.error("err", err);
    },
  });
};
