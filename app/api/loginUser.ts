import { headers } from "next/headers";

export type TLoginUser = {
  admin: boolean;
  created_at: string;
  email: string;
  id: number;
  image: string;
  name: string;
};

export async function fetchLoginUser() {
  const headersList = headers();
  const token = headersList.get("cookie");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    method: "GET",
    headers: {
      ...headers,
      Cookie: `${token}`,
    },
    cache: "force-cache",
    credentials: "include",
  });

  const user: TLoginUser = await res.json();

  return user;
}
