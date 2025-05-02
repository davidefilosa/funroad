"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ProductList, ProductListSkeleton } from "../components/product-list";

export const LibraryView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseInfiniteQuery(
    trpc.library.getMany.infiniteQueryOptions(
      { cursor: 1, limit: 10 },
      {
        getNextPageParam: (lastPage) =>
          lastPage.docs.length > 0 ? lastPage.nextPage : undefined,
      }
    )
  );

  return (
    <ErrorBoundary fallback={<div>Something went wrong...</div>}>
      <Suspense fallback={<ProductListSkeleton />}>
        <div className="min-h-screen bg-white">
          <nav className="p-4 bg-[#F4F4F0] w-full border-b">
            <Link prefetch href={"/"} className="flex items-center gap-2">
              <ArrowLeftIcon className="h-4 w-4" />
              <span className="text font-medium">Continue shopping</span>
            </Link>
          </nav>
          <header className="bg-[#F4F4F0] py-8 border-b">
            <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 flex flex-col gap-y-4">
              <h1 className="text-[40px] font-medium">Library</h1>
              <p className="font-medium">Your purchases and reviews</p>
            </div>
          </header>
          <section className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-10">
            <ProductList />
          </section>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};
