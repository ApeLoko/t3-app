import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { api } from "~/utils/api";

import "~/styles/globals.css";

// Components
import Navbar from "~/components/Navbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Navbar />
      {/* <main className="bg-blue-200 pt-16"> */}
      <ReactQueryDevtools initialIsOpen={false} />
      <Component {...pageProps} />
      {/* </main> */}
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
