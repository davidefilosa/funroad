import { Media, Tenant } from "@/payload-types";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";

export const libraryRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(10),
      })
    )
    .query(async ({ input, ctx }) => {
      const orders = await ctx.payload.find({
        collection: "orders",
        depth: 0, //get only the id
        pagination: true,
        where: {
          user: {
            equals: ctx.session.user.id,
          },
        },
        page: input.cursor,
        limit: input.limit,
      });

      const productsId = orders.docs.map((order) => order.product);

      const productsData = await ctx.payload.find({
        collection: "products",
        depth: 2,
        pagination: false,
        where: {
          id: {
            in: productsId,
          },
        },
      });

      return {
        ...productsData,
        docs: productsData.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & {
            image: Media | null;
          },
        })),
      };
    }),
});
