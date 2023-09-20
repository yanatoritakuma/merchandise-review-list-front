import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TError } from "@/types/error";
import { TResProduct } from "@/types/product";

export const useQueryUserProduct = (page: number, pageSize: number) => {
  const getUserProduct = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const { data } = await axios.get<TResProduct>(
      `${process.env.NEXT_PUBLIC_API_URL}/product/userProducts?page=${page}&pageSize=${pageSize}`
    );
    return data;
  };
  return useQuery({
    queryKey: ["userProduct"],
    queryFn: getUserProduct,
    onError: (err: TError) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error("カート情報の取得に失敗しました。");
      }
    },
  });
};
