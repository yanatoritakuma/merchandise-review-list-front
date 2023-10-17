import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TRakutenProducts } from "@/types/rakuten";

export type TPrice = {
  min: string;
  max: string;
};

export const useQueryRakuten = (
  search: string,
  price: TPrice,
  sort: string,
  page: number
) => {
  const getRakuten = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const { data } = await axios.get<TRakutenProducts>("/api/rakuten", {
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
    queryKey: ["rakuten"],
    queryFn: getRakuten,
    // suspense: true,
    onError: (err) => {
      console.error("err", err);
    },
  });
};
