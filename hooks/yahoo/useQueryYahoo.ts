import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TYahooProducts } from "@/types/yahoo";
import { TPrice } from "@/hooks/rakuten/useQueryRakuten";

export const useQueryYahoo = (
  search: string,
  price: TPrice,
  sort: string,
  page: number
) => {
  const getYahoo = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const { data } = await axios.get<TYahooProducts>("/api/yahoo", {
      params: {
        search: search,
        minPrice: price.min,
        maxPrice: price.max,
        sort: sort,
        page: page,
      },
    });
    return data;
  };
  return useQuery({
    queryKey: ["yahoo"],
    queryFn: getYahoo,
    // suspense: true,
    onError: (err) => {
      console.error("err", err);
    },
  });
};
