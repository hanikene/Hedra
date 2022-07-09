import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { prisma } from "../../../utils/prisma";

export const appRouter = trpc
  .router()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return `hello ${input?.text ?? "world"}`;
    },
  })
  .mutation("user.signUp", {
    input: z.object({
      email: z.string().email(),
      name: z.string(),
    }),
    async resolve({ input }) {
      const newUser = await prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
        },
      });
      return { success: true, data: newUser };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
