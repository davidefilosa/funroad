"use client";

import React from "react";
import { SearchInput } from "./search-input";
import { Categories } from "./categories";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const SearchFilter = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  return (
    <div
      className="px-4 lg:px-20 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: "F5F5F5" }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories />
      </div>
    </div>
  );
};

export const SearchFilterSkeleton = () => {
  return (
    <div
      className="px-4 lg:px-20 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: "F5F5F5" }}
    >
      <SearchInput disabled={true} />
      <div className="hidden lg:block">
        <Categories />
      </div>
    </div>
  );
};
