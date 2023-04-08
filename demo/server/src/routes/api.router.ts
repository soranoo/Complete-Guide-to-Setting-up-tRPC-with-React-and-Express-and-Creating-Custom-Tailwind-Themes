import { z } from "zod";
import { t, publicProcedure } from "../utils/trpc";

const helloWorldSchema = z.object({
    msg: z.string(),
});

const router = t.router({
    helloWorld: publicProcedure.input(helloWorldSchema).query(async ({ input }) => {
        return {
            msg: `Hello World! ${input.msg}`,
        };
    }),
});

export default router;