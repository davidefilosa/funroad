import React, { Suspense } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { SearchFilter, SearchFilterSkeleton } from "./search-filter";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  prefetch(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrateClient>
        <ErrorBoundary fallback={<div>Something went wrong...</div>}>
          <Suspense fallback={<SearchFilterSkeleton />}>
            <SearchFilter />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
