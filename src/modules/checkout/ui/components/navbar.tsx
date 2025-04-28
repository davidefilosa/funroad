"use client";

import { Button } from "@/components/ui/button";
import { generateTenantUrl } from "@/lib/utils";
import Link from "next/link";

interface NavbarProps {
  tenantSlug: string;
}

export const Navbar = ({ tenantSlug }: NavbarProps) => {
  return (
    <nav className="h-20 border-b font-medium bg-white ">
      <div className="max-w-(--breackpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <p className="text-xl">Checkout</p>
        <Button variant={"elevated"} asChild>
          <Link href={generateTenantUrl(tenantSlug)}>Continue shopping</Link>
        </Button>
      </div>
    </nav>
  );
};
