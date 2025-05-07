import { isSuperUser } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
  slug: "orders",
  access: {
    create: ({ req }) => isSuperUser(req.user),
    delete: ({ req }) => isSuperUser(req.user),
    update: ({ req }) => isSuperUser(req.user),
    read: ({ req }) => isSuperUser(req.user),
  },
  admin: { useAsTitle: "name" },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: false,
    },
    { name: "stripeCheckOutSessionId", type: "text", required: true },
  ],
};
