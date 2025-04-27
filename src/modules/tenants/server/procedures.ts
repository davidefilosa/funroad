import { Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const tenantsRouter = createTRPCRouter({
  get: baseProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const data = await ctx.payload.find({
        collection: "tenants",
        where: { slug: { equals: input.slug } },
        limit: 1,
        pagination: false,
      });

      if (!data.docs[0]) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Tenant not found" });
      }
      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
        })),
      };
    }),
});
