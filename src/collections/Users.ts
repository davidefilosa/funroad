import type { CollectionConfig } from "payload";
import { tenantsArrayField } from "@payloadcms/plugin-multi-tenant/fields";
import { isSuperUser } from "@/lib/access";

const defaultTenantsArrayField = tenantsArrayField({
  tenantsArrayFieldName: "tenants",
  tenantsCollectionSlug: "tenants",
  tenantsArrayTenantFieldName: "tenant",
  arrayFieldAccess: {
    read: () => true,
    create: ({ req }) => isSuperUser(req.user),
    update: ({ req }) => isSuperUser(req.user),
  },
  tenantFieldAccess: {
    read: () => true,
    create: ({ req }) => isSuperUser(req.user),
    update: ({ req }) => isSuperUser(req.user),
  },
});

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    read: () => true,
    create: ({ req }) => isSuperUser(req.user),
    delete: ({ req }) => isSuperUser(req.user),
    update: ({ req, id }) => {
      if (isSuperUser(req.user)) {
        return true;
      }

      return req.user?.id === id;
    },
  },
  admin: {
    useAsTitle: "email",
    hidden: ({ user }) => !isSuperUser(user),
  },
  auth: true,
  fields: [
    // Email added by default
    { name: "username", required: true, type: "text", unique: true },
    {
      admin: { position: "sidebar" },
      name: "roles",
      type: "select",
      defaultValue: ["user"],
      hasMany: true,
      options: ["super-admin", "user"],
      access: {
        update: ({ req }) => isSuperUser(req.user),
      },
    },
    {
      ...defaultTenantsArrayField,
      admin: {
        ...(defaultTenantsArrayField.admin || {}),
        position: "sidebar",
      },
    },
  ],
};
