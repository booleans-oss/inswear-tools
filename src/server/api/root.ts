import { createTRPCRouter } from "@/server/api/trpc";
import { clientDevisRouter } from "@/server/api/routers/clientDevis";
import { fournisseurDevisRouter } from "./routers/fournisseurDevis";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  clientDevis: clientDevisRouter,
  fournisseurDevis: fournisseurDevisRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
