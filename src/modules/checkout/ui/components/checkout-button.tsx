"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useCart } from "../../hooks/use-cart";
import { cn } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface CheckoutButtonProps {
  tenantSlug: string;
}

export const CheckoutButton = ({ tenantSlug }: CheckoutButtonProps) => {
  const { totalItems, productIds } = useCart(tenantSlug);
  const router = useRouter();
  return (
    <Button
      variant={"elevated"}
      className={cn(totalItems === 0 ? "bg-white" : "bg-pink-400")}
      disabled={totalItems === 0}
      onClick={() => router.push(`/tenants/${tenantSlug}/checkout`)}
    >
      <ShoppingCartIcon />
      <span>{totalItems}</span>
    </Button>
  );
};
