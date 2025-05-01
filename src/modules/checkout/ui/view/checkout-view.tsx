"use client";

import React, { useEffect } from "react";
import { useCart } from "../../hooks/use-cart";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckoutItem } from "../components/checkout-item";
import { cn, generateTenantUrl } from "@/lib/utils";
import { CheckoutSidebar } from "../components/checkout-sidebar";
import { InboxIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCheckoutStates } from "../../hooks/use-checkout-states";
import { useRouter } from "next/navigation";

interface CheckoutViewProps {
  slug: string;
}

export const CheckoutView = ({ slug }: CheckoutViewProps) => {
  const { productIds, clearAllCarts, removeProductFromCart, clearCart } =
    useCart(slug);
  const [states, setStates] = useCheckoutStates();
  const router = useRouter();

  const trpc = useTRPC();
  const { data, error, isLoading } = useQuery(
    trpc.checkout.getProducts.queryOptions({ ids: productIds })
  );

  const purchase = useMutation(
    trpc.checkout.purchase.mutationOptions({
      onMutate: () => {
        setStates({ success: false, cancel: false });
      },
      onSuccess: (data) => {
        window.location.href = data.url;
      },
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          router.push("/sign-in");
        }
        toast.error(error.message);
      },
    })
  );

  useEffect(() => {
    if (states.success) {
      setStates({ success: false, cancel: false });
      clearCart();
      router.push("/products");
    }
  }, [states.success, clearCart, router, setStates]);

  useEffect(() => {
    if (error && error.data?.code === "NOT_FOUND") {
      clearAllCarts();
      toast.warning("Invalid product. Carts cleared.");
    }
  }, [error, clearAllCarts]);

  if (isLoading) {
    return (
      <div className="lg:p-16 pt-4 px-4 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
          {/* Left side: Checkout items */}
          <div className="lg:col-span-4">
            <div className="border rounded-md overflow-hidden bg-white p-4 flex flex-col gap-4">
              {/* Simulate 3 loading items */}
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={cn(
                    "flex items-center gap-4 border-b pb-4",
                    item === 3 && "border-b-0"
                  )}
                >
                  <Skeleton className="w-20 h-20 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                  <Skeleton className="w-8 h-8" />
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Checkout sidebar */}
          <div className="lg:col-span-3">
            <div className="border rounded-md overflow-hidden bg-white p-6 space-y-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-6 w-1/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (data?.docs.length === 0) {
    return (
      <div className="p-4 lg:p-16">
        <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
          <InboxIcon />
          <p className="text-base font-medium">No products found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:p-16 pt-4 px-4 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="border rounded-md overflow-hidden bg-white">
            {data?.docs.map((product, index) => (
              <CheckoutItem
                key={product.id}
                isLast={index === data.docs.length - 1}
                imageUrl={product.image?.url}
                name={product.name}
                productUrl={`${generateTenantUrl(product.tenant.slug)}/products/${product.id}`}
                tenantUrl={generateTenantUrl(product.tenant.slug)}
                tenantName={product.tenant.name}
                price={product.price}
                onRemove={() => removeProductFromCart(product.id)}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <CheckoutSidebar
            total={data?.total || 0}
            onCheckout={() => {
              purchase.mutate({ productsId: productIds, tenantSlug: slug });
            }}
            isCanceled={states.cancel}
            isPending={purchase.isPending}
          />
        </div>
      </div>
    </div>
  );
};
