"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { CategoryDropdown } from "./category-dropdown";
import { cn } from "@/lib/utils";

interface CategoriesProps {
  data: any;
}
export const Categories = ({ data }: CategoriesProps) => {
  const [isActive, setIsActive] = useState(true);
  return (
    <div className="w-full flex items-center flex-nowrap gap-2">
      <Button
        variant={"elevated"}
        className={cn(
          "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
          isActive && "bg-white border-primary"
        )}
      >
        All
      </Button>
      {data.map((category: any) => (
        <div key={category.id}>
          <CategoryDropdown
            category={category}
            isActive={false}
            isNavigationHovered={false}
          />
        </div>
      ))}
    </div>
  );
};
