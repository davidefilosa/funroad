"use client";

import { Input } from "@/components/ui/input";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { Category } from "../types";
import { CategorySidebar } from "./category-sidebar";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  disabled?: boolean;
  data: Category[];
}

export const SearchInput = ({ disabled, data }: SearchInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex item-center gap-2 w-full">
      <CategorySidebar data={data} open={isOpen} onOpenChange={setIsOpen} />
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
    </div>
  );
};
