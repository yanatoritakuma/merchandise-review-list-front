import Header from "@/app/components/layout/header";
import "@/style/globals.css";
import { MessageProvider } from "@/app/provider/messageProvider";
import { SnackbarBox } from "@/app/components/elements/snackbarBox";
import { fetchLoginUser } from "@/app/api/fetchLoginUser";
import { BackdropBox } from "@/app/components/elements/backdropBox";
import { BackdropProvider } from "./provider/backdropProvider";

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
            <BackdropBox open={false} />
            <SnackbarBox />
            <Header loginUser={loginUser} />
            {children}
          </BackdropProvider>
        </MessageProvider>
      </body>
    </html>
  );
}
