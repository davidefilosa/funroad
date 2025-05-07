import { isSuperUser } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    delete: ({ req }) => isSuperUser(req.user),
  },
  admin: { hidden: ({ user }) => !isSuperUser(user) },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
