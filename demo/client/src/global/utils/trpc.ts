import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../../server/src" //? By using import type you ensure that the reference will be stripped at compile-time, meaning you don't inadvertently import server-side code into your client.

export const trpc = createTRPCReact<AppRouter>();
