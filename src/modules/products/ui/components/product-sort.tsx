"use client";

import { useProductFilter } from "../../hooks/use-product-filter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ProductSort = () => {
  const [filters, setFilters] = useProductFilter();

  const sortTitle =
    filters.sort === "trending"
      ? "Trending products"
      : filters.sort === "hot_and_new"
        ? "Hot & New"
        : "Curated for you";

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 justify-between">
      <p className="text-2xl font-medium">{sortTitle}</p>
      <div className="flex items-center gap-2">
        <Button
          size={"sm"}
          className={cn(
            "rounded-full bg-white hover:bg-white",
            filters.sort !== "curated" &&
              "bg-transparent border-transparent hover:border-border hover:bg-transparent"
          )}
          variant={"secondary"}
          onClick={() => setFilters({ sort: "curated" })}
        >
          Curated
        </Button>
        <Button
          size={"sm"}
          className={cn(
            "rounded-full bg-white hover:bg-white",
            filters.sort !== "trending" &&
              "bg-transparent border-transparent hover:border-border hover:bg-transparent"
          )}
          variant={"secondary"}
          onClick={() => setFilters({ sort: "trending" })}
        >
          Trending
        </Button>
        <Button
          size={"sm"}
          className={cn(
            "rounded-full bg-white hover:bg-white",
            filters.sort !== "hot_and_new" &&
              "bg-transparent border-transparent hover:border-border hover:bg-transparent"
          )}
          variant={"secondary"}
          onClick={() => setFilters({ sort: "hot_and_new" })}
        >
          Hot & New
        </Button>
      </div>
    </div>
  );
};
