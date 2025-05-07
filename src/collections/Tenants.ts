import { isSuperUser } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  access: {
    read: () => true,
    create: ({ req }) => isSuperUser(req.user),
    delete: ({ req }) => isSuperUser(req.user),
  },
  admin: {
    useAsTitle: "slug",
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
      label: "Store Name",
      admin: {
        description: "This is the name of the store (e.g Davide´s Store)",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          "This is the subdomain for the store (e.g [slug].funroad.com)",
      },
    },
    { name: "image", type: "upload", relationTo: "media" },
    {
      name: "stripeAccount",
      type: "text",
      required: true,
      access: { update: ({ req }) => isSuperUser(req.user) },
    },
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",
      admin: {
        readOnly: true,
        description: "Stripe details associated with your shop",
      },
    },
  ],
};
