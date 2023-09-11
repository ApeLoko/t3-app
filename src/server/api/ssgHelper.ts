import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "./root";
import superjson from "superjson";
import { createInnerTRPCContext } from "./trpc";

export function ssgHelper() {
  return createServerSideHelpers({
    router: appRouter,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ctx: createInnerTRPCContext({ session: null, revalidateSSG: null }),
    transformer: superjson,
  });
}
