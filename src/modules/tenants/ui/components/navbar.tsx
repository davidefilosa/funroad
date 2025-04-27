"use client";

import { generateTenantUrl } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  tenantSlug: string;
}

export const Navbar = ({ tenantSlug }: NavbarProps) => {
  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.tenants.get.queryOptions({ slug: tenantSlug })
  );

  const tenant = data?.docs[0];
  if (!tenant) return null;

  return (
    <nav className="h-20 border-b font-medium bg-white ">
      <div className="max-w-(--breackpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <Link href={generateTenantUrl(tenant.slug)}>
          <div className="flex items-center gap-2">
            {tenant?.image?.url && (
              <Image
                src={tenant?.image?.url || "/profile.jpg"}
                alt={tenant?.name || "profile"}
                width={20}
                height={20}
                className="rounded-full w-8 h-8 object-cover border border-black"
              />
            )}
            <p className="text-xl">{tenant?.name}</p>
          </div>
        </Link>
      </div>
    </nav>
  );
};
