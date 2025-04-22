import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

export type Product =
  inferRouterOutputs<AppRouter>["products"]["getMany"][number];
