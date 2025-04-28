"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import React from "react";

interface CartButtonProps {
  tenantSlug: string;
  productId: string;
}

export const CartButton = ({ tenantSlug, productId }: CartButtonProps) => {
  const cart = useCart(tenantSlug);
  return (
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
