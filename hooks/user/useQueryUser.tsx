import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TUser } from "@/types/user";
import { TError } from "@/types/error";

export const useQueryUser = () => {
  const getUser = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const { data } = await axios.get<TUser>(
      `${process.env.NEXT_PUBLIC_API_URL}/user`
    );
    return data;
  };
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    // suspense: false,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        console.error("未ログイン");
      }
    },
  });
};
