import { use } from "react";
import Header from "@/app/components/layout/header";
import "@/style/globals.css";
import { BackdropProvider } from "@/app/provider/backdropProvider";
import { MessageProvider } from "@/app/provider/messageProvider";
import { SnackbarBox } from "@/app/components/elements/snackbarBox";
import { BackdropBox } from "@/app/components/elements/backdropBox";
import { fetchLoginUser } from "@/app/api/fetchLoginUser";

export const metadata = {
  title: "merchandise-review-list",
  description: "merchandise-review-list",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loginUser = use(fetchLoginUser());

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
