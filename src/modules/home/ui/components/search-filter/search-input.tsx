"use client";

import { Input } from "@/components/ui/input";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { CategorySidebar } from "./category-sidebar";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface SearchInputProps {
  disabled?: boolean;
}

export const SearchInput = ({ disabled }: SearchInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <div className="flex item-center gap-2 w-full">
      <CategorySidebar open={isOpen} onOpenChange={setIsOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute top-1/2 -translate-y-1/2 size-4 left-2 text-muted-foreground" />
        <Input
          placeholder="Search products"
          className="pl-8"
          disabled={disabled}
        />
      </div>
      <Button
        variant={"elevated"}
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <ListFilterIcon />
      </Button>

      {session.data?.user && (
        <Button variant={"elevated"} asChild>
          <Link prefetch href={"/library"}>
            <BookmarkCheckIcon /> Library
          </Link>
        </Button>
      )}
    </div>
  );
};
