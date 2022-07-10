import * as trpcNext from "@trpc/server/adapters/next";
import initializeFireBase from "../../../../firebase/firebaseAdmin";
import { createContext } from "../../../server/createContext";
import { appRouter } from "../../../server/routes/app.router";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});

initializeFireBase();
