"use client";

import { generateTenantUrl } from "@/lib/utils";
// import { CheckoutButton } from "@/modules/checkout/ui/components/checkout-button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const CheckoutButton = dynamic(
  () =>
    import("@/modules/checkout/ui/components/checkout-button").then(
      (mod) => mod.CheckoutButton
    ),
  {
    ssr: false,
    loading: () => (
      <Button disabled variant={"elevated"}>
        <LoaderIcon className="animate-spin" />
      </Button>
    ),
  }
);

interface NavbarProps {
  tenantSlug: string;
}

export const Navbar = ({ tenantSlug }: NavbarProps) => {
  const trpc = useTRPC();
  const { data, isLoading } = useQuery(
    trpc.tenants.get.queryOptions({ slug: tenantSlug })
  );

  const tenant = data?.docs[0];
  if (!tenant) return null;

  if (isLoading) return <NavbarSkeleton />;

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
        <CheckoutButton tenantSlug={tenant.slug} />
      </div>
    </nav>
  );
};

export const NavbarSkeleton = () => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-[var(--breackpoint-xl)] mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <div className="flex items-center gap-2">
          <Skeleton className="rounded-full w-8 h-8 border border-black" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
    </nav>
  );
};
