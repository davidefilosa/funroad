"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { useProductFilter } from "../../hooks/use-product-filter";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";

interface ProductListProps {
  category?: string;
  slug?: string;
}

export const ProductList = ({ category, slug }: ProductListProps) => {
  const [filters] = useProductFilter();
  const trpc = useTRPC();
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useSuspenseInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions(
      { ...filters, category, limit: 10, tenantSlug: slug },
      {
        getNextPageParam: (lastPage) =>
          lastPage.docs.length > 0 ? lastPage.nextPage : undefined,
      }
    )
  );

  if (data?.pages?.[0]?.docs.length === 0) {
    return (
      <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
        <InboxIcon />
        <p className="text-base font-medium">No products found</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data?.pages.flatMap((page) =>
          page?.docs.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              authorUsername={product.tenant?.name}
              authorImageUrl={product.tenant?.image?.url}
              imageUrl={product.image?.url}
              price={product.price}
              reviewRating={product.reviewRating}
              reviewCount={product.reviewsCount}
              tenantSlug={product.tenant?.slug}
            />
          ))
        )}
      </div>
      <div className="flex justify-center pt-8">
        {hasNextPage && (
          <Button
            variant={"elevated"}
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            Load more
          </Button>
        )}
      </div>
    </>
  );
};

export const ProductListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {Array.from({ length: 10 }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
