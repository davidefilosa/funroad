import { Media, Tenant } from "@/payload-types";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
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

  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const orderData = await ctx.payload.find({
        collection: "orders",
        limit: 1,
        pagination: false,
        where: {
          and: [
            {
              user: {
                equals: ctx.session.user.id,
              },
            },
            {
              product: {
                equals: input.id,
              },
            },
          ],
        },
      });

      const order = orderData.docs[0];

      if (!order) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Order not found" });
      }

      const product = await ctx.payload.findByID({
        collection: "products",
        id: input.id,
      });

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      return product;
    }),
});
