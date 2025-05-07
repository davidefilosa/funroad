import { isSuperUser } from "@/lib/access";
import { Tenant } from "@/payload-types";
import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  access: {
    read: () => true,
    create: ({ req }) => {
      if (isSuperUser(req.user)) return true;
      const tenant = req.user?.tenants?.[0]?.tenant as Tenant;
      return Boolean(tenant?.stripeDetailsSubmitted);
    },
    delete: ({ req }) => isSuperUser(req.user),
    update: ({ req }) => isSuperUser(req.user),
  },
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "description", type: "text" },
    {
      name: "price",
      type: "number",
      required: true,
      admin: { description: "in USD" },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    { name: "image", type: "upload", relationTo: "media" },
    {
      name: "refundPolicy",
      type: "select",
      options: ["30-day", "14-day", "No refund", "Store credit only"],
      defaultValue: "30-day",
    },
    {
      name: "content",
      type: "textarea",
      admin: {
        description:
          "Protected content only visible after purchase. Add prooduct documentation, downloadable files, getting start guides. Supports markdown formatting.",
      },
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
  ],
};
