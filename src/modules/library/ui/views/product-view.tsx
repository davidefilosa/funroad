"use client";

import { useTRPC } from "@/trpc/client";
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ProductList, ProductListSkeleton } from "../components/product-list";
import { ReviewSidebar } from "../components/review-sidebar";

interface ProductViewProps {
  productId: string;
}

export const ProductView = ({ productId }: ProductViewProps) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.library.getOne.queryOptions({ id: productId })
  );

  return (
    <ErrorBoundary fallback={<div>Something went wrong...</div>}>
      <Suspense fallback={<ProductListSkeleton />}>
        <div className="min-h-screen bg-white">
          <nav className="p-4 bg-[#F4F4F0] w-full border-b">
            <Link
              prefetch
              href={"/library"}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span className="text font-medium">Continue shopping</span>
            </Link>
          </nav>
          <header className="bg-[#F4F4F0] py-8 border-b">
            <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12">
              <h1 className="text-[40px] font-medium">{data.name}</h1>
            </div>
          </header>
          <section className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
              <div className="lg:col-span-2">
                <div className="p-4 bg-white rounded-md border gap-4">
                  <ReviewSidebar productId={productId} />
                </div>
              </div>
              <div className="lg:col-span-5">
                {data.content ? (
                  <p>{data.content}</p>
                ) : (
                  <p className="font-medium italic text-muted-foreground">
                    No special content
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};
