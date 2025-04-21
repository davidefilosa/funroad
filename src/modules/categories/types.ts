import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

export type Category =
  inferRouterOutputs<AppRouter>["categories"]["getMany"][number];
