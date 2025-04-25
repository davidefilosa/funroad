import { Category, Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Sort, Where } from "payload";
import { z } from "zod";

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

        const data = await ctx.payload.find({
          collection: "products",
          depth: 1, // populate category and image
          pagination: true,
          where: where,
          sort: sort,
          page: input.cursor,
          limit: input.limit,
        });

        return {
          ...data,
          docs: data.docs.map((doc) => ({
            ...doc,
            image: doc.image as Media | null,
          })),
        };
      }
    }),
});
