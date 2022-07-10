import * as trpc from "@trpc/server";
import { Context } from "../createContext";
import userRouter from "./user.router";

export const appRouter = trpc.router<Context>().merge("users.", userRouter);

export type AppRouter = typeof appRouter;
