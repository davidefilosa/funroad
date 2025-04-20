"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { useDropdownPosition } from "./use-dropdown-position";
import { SubcategoryMenu } from "./subcategory-menu";

interface CategoryDropdownProps {
  category: any;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: CategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownref = useRef<HTMLDivElement>(null);

  const { getDropdownPosition } = useDropdownPosition(dropDownref);
  const dropdownPosition = getDropdownPosition();

  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true);
    }
  };

  const OnMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="relative"
      ref={dropDownref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={OnMouseLeave}
    >
      <div className="relative">
        <Button
          variant={"elevated"}
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
            isActive && !isNavigationHovered && "bg-white border-primary"
          )}
        >
          {category.name}
        </Button>
        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px]  border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2",
              isOpen && "opacity-100"
            )}
          />
        )}
      </div>
      <SubcategoryMenu
        isOpen={isOpen}
        position={dropdownPosition}
        category={category}
      />
    </div>
  );
};
