import Header from "@/app/components/header";
import "@/style/globals.css";

export const metadata = {
  title: "merchandise-review-list",
  description: "merchandise-review-list",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
