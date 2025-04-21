import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Category } from "../types";

interface SubcategoryMenuProps {
  isOpen?: boolean;
  category: Category;
  position: { top: number; left: number };
}

export const SubcategoryMenu = ({
  isOpen,
  category,
  position,
}: SubcategoryMenuProps) => {
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories.length === 0
  ) {
    return null;
  }

  const backgroundColor = category.color || "#f5f5f5";

  return (
    <div
      className={cn("fixed z-100 ")}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className="h-3 w-60" />
      <div
        className="w-60 border text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]  rounded-md overflow-hidden"
        style={{ backgroundColor }}
      >
        <div>
          {category.subcategories?.map((subcategory: any) => (
            <Link
              href={`/${category.slug}/${subcategory.slug}`}
              key={subcategory.slug}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium hover:no-underline"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
