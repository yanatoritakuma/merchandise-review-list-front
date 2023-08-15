import Header from "@/app/components/layout/header";
import { BackdropProvider } from "@/provider/BackdropProvider";
import "@/style/globals.css";
import { SnackbarBox } from "@/app/components/elements/SnackbarBox";
import { MessageProvider } from "@/provider/MessageProvider";
import { BackdropBox } from "@/app/components/elements/BackdropBox";
import { fetchLoginUser } from "@/app/api/loginUser";

export const metadata = {
  title: "merchandise-review-list",
  description: "merchandise-review-list",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loginUser = await fetchLoginUser();

  return (
    <html lang="ja">
      <body>
        <MessageProvider>
          <BackdropProvider>
            <SnackbarBox />
            <BackdropBox />
            <Header loginUser={loginUser} />
            {children}
          </BackdropProvider>
        </MessageProvider>
      </body>
    </html>
  );
}
