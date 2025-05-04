import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

export type Review = inferRouterOutputs<AppRouter>["review"]["getOne"];
