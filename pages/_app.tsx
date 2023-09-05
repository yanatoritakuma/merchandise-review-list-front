import "@/style/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense, useEffect } from "react";
import axios from "axios";
import Header from "@/components/layout/header";
import { MessageProvider } from "@/provider/messageProvider";
import { BackdropProvider } from "@/provider/backdropProvider";
import { SnackbarBox } from "@/components/elements/snackbarBox";
import { BackdropBox } from "@/components/elements/backdropBox";

// import { PostProvider } from "@/provider/PostProvider";
// import { ApiTimeoutBox } from "@/components/common/ApiTimeOutBox";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      suspense: true,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/csrf`
      );
      axios.defaults.headers.common["X-CSRF-Token"] = data.csrf_token;
    };
    getCsrfToken();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MessageProvider>
        <BackdropProvider>
          {/* <PostProvider> */}
          <Header />
          <Component {...pageProps} />
          <ReactQueryDevtools />
          <SnackbarBox />
          <BackdropBox />
          {/* <ApiTimeoutBox /> */}
          {/* </PostProvider> */}
        </BackdropProvider>
      </MessageProvider>
    </QueryClientProvider>
  );
}
