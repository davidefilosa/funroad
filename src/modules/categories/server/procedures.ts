import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.payload.find({
      collection: "categories",
      depth: 1,
      pagination: false,
      where: { parent: { exists: false } },
      sort: "name",
    });

    const formattedData = data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
        ...(doc as any),
        subcategories: undefined,
      })),
    }));
    return formattedData;
  }),
  getOne: baseProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.payload.find({
        collection: "categories",
        depth: 1,
        pagination: false,
        where: { parent: { exists: false }, slug: { equals: input.slug } },
      });

      const formattedData = data.docs.map((doc) => ({
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
          ...(doc as any),
          subcategories: undefined,
        })),
      }));
      return formattedData;
    }),
});
