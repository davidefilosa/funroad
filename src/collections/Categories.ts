import { isSuperUser } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  access: {
    read: () => true,
    create: ({ req }) => isSuperUser(req.user),
    delete: ({ req }) => isSuperUser(req.user),
    update: ({ req }) => isSuperUser(req.user),
  },
  admin: { useAsTitle: "name", hidden: ({ user }) => !isSuperUser(user) },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, index: true },
    { name: "color", type: "text" },
    {
      name: "parent",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    {
      name: "subcategories",
      type: "join",
      collection: "categories",
      on: "parent",
      hasMany: true,
    },
  ],
};
