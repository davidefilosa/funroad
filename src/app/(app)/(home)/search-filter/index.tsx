import React from "react";
import { SearchInput } from "./search-input";
import { Categories } from "./categories";
import { Category } from "../types";

interface SearchFilterProps {
  data: Category[];
}
export const SearchFilter = ({ data }: SearchFilterProps) => {
  return (
    <div className="px-4 lg:px-20 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput data={data} />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </div>
  );
};
