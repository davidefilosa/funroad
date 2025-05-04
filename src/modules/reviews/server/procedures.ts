import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const reviewRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        rating: z.number().min(1).max(5),
        description: z.string().min(1, { message: "Description is required" }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { productId, rating, description } = input;

      const product = await ctx.payload.findByID({
        collection: "products",
        id: productId,
      });

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      const exstingReview = await ctx.payload.find({
        collection: "reviews",
        where: {
          and: [
            {
              product: { equals: productId },
            },
            { user: { equals: ctx.session.user.id } },
          ],
        },
      });

      if (exstingReview.totalDocs > 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You have already reviewed this product",
        });
      }

      const review = await ctx.payload.create({
        collection: "reviews",
        data: {
          user: ctx.session.user.id,
          product: product.id,
          rating,
          description,
        },
      });

      return review;
    }),
  update: protectedProcedure
    .input(
      z.object({
        reviewId: z.string(),
        rating: z.number().min(1).max(5),
        description: z.string().min(1, { message: "Description is required" }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { reviewId, rating, description } = input;

      const exstingReview = await ctx.payload.findByID({
        collection: "reviews",
        id: reviewId,
        depth: 0,
      });

      if (!exstingReview) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Review not found",
        });
      }

      if (exstingReview.user !== ctx.session.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not allowed to update this review",
        });
      }

      const review = await ctx.payload.update({
        collection: "reviews",
        id: reviewId,
        data: {
          rating,
          description,
        },
      });

      return review;
    }),

  getOne: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const product = await ctx.payload.findByID({
        collection: "products",
        id: input.productId,
      });

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      const reviewsData = await ctx.payload.find({
        collection: "reviews",
        depth: 0,
        pagination: false,
        limit: 1,
        where: {
          and: [
            { product: { equals: input.productId } },
            { user: { equals: ctx.session.user.id } },
          ],
        },
      });

      const review = reviewsData.docs[0];

      if (!review) {
        return null;
      }

      return review;
    }),
});
