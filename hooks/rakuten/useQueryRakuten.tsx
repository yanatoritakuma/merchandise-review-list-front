import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TRakutenProducts } from "@/types/rakuten";

export const useQueryRakuten = (search: string, page: number) => {
  const getRakuten = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const { data } = await axios.get<TRakutenProducts>("/api/rakuten", {
      params: {
        search: search,
        page: page,
      },
    });
    return data;
  };
  return useQuery({
    queryKey: ["rakuten"],
    queryFn: getRakuten,
    // suspense: true,
    onError: (err: any) => {
      console.error("err", err);
    },
  });
};
