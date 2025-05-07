import { Category, Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Sort, Where } from "payload";
import { z } from "zod";
import { headers as getHeaders } from "next/headers";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        sort: z.enum(["curated", "trending", "hot_and_new"]).optional(),
        cursor: z.number().default(1),
        limit: z.number().default(10),
        tenantSlug: z.string().nullable().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const where: Where = {};
      let sort: Sort = "-price";
      if (input.sort === "trending") {
        sort = "-name";
      }
      if (input.sort === "hot_and_new") {
        sort = "-createdAt";
      }
      if (input.minPrice) {
        where.price = { greater_than_equal: input.minPrice };
      }

      if (input.maxPrice) {
        if (where.price) {
          where.price = {
            greater_than_equal: input.minPrice,
            less_than_equal: input.maxPrice,
          };
        } else {
          where.price = { less_than_equal: input.maxPrice };
        }
      }

      if (input.tenantSlug) {
        where["tenant.slug"] = {
          equals: input.tenantSlug,
        };
      }

      if (input.category) {
        const categoriesData = await ctx.payload.find({
          collection: "categories",
          depth: 1, // populate subcategories
          limit: 1,
          pagination: false,
          where: { slug: { equals: input.category } },
        });

        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            ...(doc as Category),
            subcategories: undefined,
          })),
        }));

        const subcategories = [];
        const parentCategory = formattedData[0];

        if (parentCategory) {
          if (parentCategory) {
            subcategories.push(
              ...parentCategory.subcategories.map(
                (subcategory) => subcategory.slug
              )
            );
          }

          where["category.slug"] = {
            in: [parentCategory.slug, ...subcategories],
          };
        }

        if (input.tags && input.tags.length > 0) {
          where["tags.name"] = { in: input.tags };
        }
      }

      const data = await ctx.payload.find({
        collection: "products",
        depth: 2, // populate category and image
        pagination: true,
        where: where,
        sort: sort,
        page: input.cursor,
        limit: input.limit,
        select: { content: false },
      });

      const dataWithSummarizedReviews = await Promise.all(
        data.docs.map(async (doc) => {
          const reviewsData = await ctx.payload.find({
            collection: "reviews",
            pagination: false,
            where: {
              product: {
                equals: doc.id,
              },
            },
          });

          return {
            ...doc,
            reviewsCount: reviewsData.totalDocs,
            reviewRating:
              reviewsData.docs.length === 0
                ? 0
                : reviewsData.docs.reduce((acc, doc) => acc + doc.rating, 0) /
                  reviewsData.totalDocs,
          };
        })
      );

      return {
        ...data,
        docs: dataWithSummarizedReviews.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & {
            image: Media | null;
          },
        })),
      };
    }),
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const headers = await getHeaders();
      const session = await ctx.payload.auth({ headers });

      const product = await ctx.payload.findByID({
        collection: "products",
        id: input.id,
        depth: 2, // populate category and image
        select: { content: false },
      });

      let isPurchased = false;

      if (session.user) {
        const orderData = await ctx.payload.find({
          collection: "orders",
          limit: 1,
          pagination: false,
          where: {
            and: [
              {
                product: {
                  equals: input.id,
                },
              },
              {
                user: {
                  equals: session.user.id,
                },
              },
            ],
          },
        });

        isPurchased = orderData.totalDocs > 0;
      }

      const reviews = await ctx.payload.find({
        collection: "reviews",
        pagination: false,
        where: {
          product: {
            equals: product.id,
          },
        },
      });

      const reviewRating =
        reviews.docs.length === 0
          ? 0
          : reviews.docs.reduce((acc, doc) => acc + doc.rating, 0) /
            reviews.totalDocs;

      const ratingDistribution: Record<number, number> = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      };

      if (reviews.docs.length > 0) {
        reviews.docs.forEach((review) => {
          const rating = review.rating;
          if (rating >= 1 && rating <= 5) {
            ratingDistribution[rating] = (ratingDistribution[rating] || 0) + 1;
          }
        });

        Object.keys(ratingDistribution).forEach((key) => {
          const rating = Number(key);
          const count = ratingDistribution[rating] || 0;
          ratingDistribution[rating] = Math.round(
            (count / reviews.totalDocs) * 100
          );
        });
      }

      return {
        ...product,
        isPurchased,
        reviewsCount: reviews.totalDocs,
        reviewRating,
        ratingDistribution,
        image: product.image as Media | null,
        tenant: product.tenant as Tenant & { image: Media | null },
      };
    }),
});
