import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

// Components
import Navbar from "~/components/Navbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <WagmiConfig config={config}>
        <Navbar />
        <ReactQueryDevtools initialIsOpen={false} />
        <Component {...pageProps} />
      </WagmiConfig>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
