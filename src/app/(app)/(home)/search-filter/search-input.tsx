import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";

interface SearchInputProps {
  disabled?: boolean;
}

export const SearchInput = ({ disabled }: SearchInputProps) => {
  return (
    <div className="flex item-center gap-2 w-full">
      <div className="relative w-full">
        <SearchIcon className="absolute top-1/2 -translate-y-1/2 size-4 left-2 text-muted-foreground" />
        <Input
          placeholder="Search products"
          className="pl-8"
          disabled={disabled}
        />
      </div>
    </div>
  );
};
