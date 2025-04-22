"use client";

import React from "react";
import { SearchInput } from "./search-input";
import { Categories } from "./categories";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { BreadcrumbNavigation } from "./breadcrumb-navigation";

export const SearchFilter = () => {
  const params = useParams();
  const category = params.category as string | undefined;
  const subacategory = params.subcategory as string | undefined;

  const activeCategory = category || "all";
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  const activeCategoryData = data.find(
    (category) => category.slug === activeCategory
  );
  const activeCategoryColor = activeCategoryData?.color;
  const activeCategoryName = activeCategoryData?.name;
  const activeSubcategoryName =
    activeCategoryData?.subcategories?.find(
      (subcategory) => subcategory.slug === subacategory
    )?.name || null;

  return (
    <div
      className="px-4 lg:px-20 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: activeCategoryColor || "#F5F5F5" }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories />
      </div>
      <BreadcrumbNavigation
        categoryName={activeCategoryName}
        subcategoryName={activeSubcategoryName}
        activeCategory={activeCategoryData?.slug}
      />
    </div>
  );
};

export const SearchFilterSkeleton = () => {
  return (
    <div
      className="px-4 lg:px-20 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <SearchInput disabled={true} />
      <div className="hidden lg:block">
        <Categories />
      </div>
    </div>
  );
};
