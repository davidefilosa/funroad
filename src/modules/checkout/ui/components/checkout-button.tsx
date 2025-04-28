import { Button } from "@/components/ui/button";
import React from "react";
import { useCart } from "../../hooks/use-cart";
import { cn } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";

interface CheckoutButtonProps {
  tenantSlug: string;
}

export const CheckoutButton = ({ tenantSlug }: CheckoutButtonProps) => {
  const { totalItems, productIds } = useCart(tenantSlug);
  console.log("totalItems", productIds);
  return (
    <Button
      variant={"elevated"}
      className={cn(totalItems === 0 ? "bg-white" : "bg-pink-400")}
      disabled={totalItems === 0}
    >
      <ShoppingCartIcon />
      <span>{totalItems}</span>
    </Button>
  );
};
