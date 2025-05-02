"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import Link from "next/link";
import React from "react";

interface CartButtonProps {
  tenantSlug: string;
  productId: string;
  isPurchased?: boolean;
}

export const CartButton = ({
  tenantSlug,
  productId,
  isPurchased,
}: CartButtonProps) => {
  const cart = useCart(tenantSlug);
  return isPurchased ? (
    <Button
      variant={"elevated"}
      asChild
      className="flex-1 bg-white font-medium"
    >
      <Link prefetch href={`/library/${productId}`}>
        View in Library
      </Link>
    </Button>
  ) : (
    <Button
      variant={"elevated"}
      className={cn(
        "flex-1",
        cart.isProductInCart(productId) ? "bg-white" : "bg-pink-400"
      )}
      onClick={() => cart.toggleProduct(productId)}
    >
      {cart.isProductInCart(productId) ? "Remove from cart" : "Add to cart"}
    </Button>
  );
};
