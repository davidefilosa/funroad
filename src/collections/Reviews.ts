import { isSuperUser } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  access: {
    create: ({ req }) => isSuperUser(req.user),
    delete: ({ req }) => isSuperUser(req.user),
    update: ({ req }) => isSuperUser(req.user),
    read: ({ req }) => isSuperUser(req.user),
  },
  admin: { useAsTitle: "description" },
  fields: [
    { name: "description", type: "textarea", required: true },
    { name: "rating", type: "number", required: true, min: 1, max: 5 },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      hasMany: false,
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: true,
    },
  ],
};
