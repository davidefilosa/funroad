import { cn } from "@/lib/utils";
import { Category } from "@/modules/categories/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SubcategoryMenuProps {
  isOpen?: boolean;
  category: Category;
}

export const SubcategoryMenu = ({ isOpen, category }: SubcategoryMenuProps) => {
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
      className={cn("absolute z-50 ")}
      style={{
        top: "100%",
        left: 0,
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
        <div className="w-full h-32 relative flex justify-end">
          <div className="overflow-hidden size-full  absolute -right-4 -bottom-4">
            <Image fill alt={category.name} src={`/${category.slug}.svg`} />
          </div>
        </div>
      </div>
    </div>
  );
};
