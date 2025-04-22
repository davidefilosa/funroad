import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Where } from "payload";
import { z } from "zod";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(z.object({ category: z.string().nullable().optional() }))
    .query(async ({ input, ctx }) => {
      const where: Where = {};
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
        }

        where["category.slug"] = {
          in: [parentCategory.slug, ...subcategories],
        };

        const data = await ctx.payload.find({
          collection: "products",
          depth: 1, // populate category and image
          pagination: true,
          where: where,
        });

        return data;
      }
    }),
});
