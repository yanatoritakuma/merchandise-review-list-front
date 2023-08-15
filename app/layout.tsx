import Header from "@/app/components/layout/header";
import "@/style/globals.css";
import { headers } from "next/headers";

export const metadata = {
  title: "merchandise-review-list",
  description: "merchandise-review-list",
};

export type TLoginUser = {
  admin: boolean;
  created_at: string;
  email: string;
  id: number;
  image: string;
  name: string;
};

async function fetchLoginUser() {
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loginUser = await fetchLoginUser();

  return (
    <html lang="ja">
      <body>
        <Header loginUser={loginUser} />
        {children}
      </body>
    </html>
  );
}
