import * as trpc from "@trpc/server";
import { Context } from "../createContext";
import { z } from "zod";
import { prisma } from "../../utils/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

const userRouter = trpc
  .router<Context>()
  .mutation("signUp", {
    input: z.object({
      email: z.string().email(),
      name: z.string(),
    }),
    async resolve({ input }) {
      const { email, name } = input;
      try {
        const newUser = await prisma.user.create({
          data: {
            email,
            name,
          },
        });
        return { success: true, data: newUser };
      } catch (err) {
        if (
          err instanceof PrismaClientKnownRequestError &&
          err.code === "P2002"
        )
          throw new trpc.TRPCError({
            code: "CONFLICT",
            message: "User Already exists",
          });

        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    },
  })
  .query("get-token", {
    async resolve({ ctx }) {
      const { user_id } = await ctx;
      return { data: user_id ?? "No valid token provided." };
    },
  });

export default userRouter;
