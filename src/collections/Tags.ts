import { isSuperUser } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Tags: CollectionConfig = {
  slug: "tags",
  access: {
    read: () => true,
    create: ({ req }) => isSuperUser(req.user),
    delete: ({ req }) => isSuperUser(req.user),
    update: ({ req }) => isSuperUser(req.user),
  },
  admin: { useAsTitle: "name", hidden: ({ user }) => !isSuperUser(user) },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
  ],
};
