import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

interface BreadcrumbNavigationProps {
  categoryName?: string | null;
  subcategoryName?: string | null;
  activeCategory?: string | null;
}

export const BreadcrumbNavigation = ({
  categoryName,
  subcategoryName,
  activeCategory,
}: BreadcrumbNavigationProps) => {
  return (
    <>
      {categoryName && (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="text-xl font-medium text-primary">
              {subcategoryName ? (
                <BreadcrumbLink
                  href={`/${activeCategory}`}
                  className="underline"
                >
                  {categoryName}
                </BreadcrumbLink>
              ) : (
                <> {categoryName}</>
              )}
            </BreadcrumbItem>
            {subcategoryName && (
              <>
                <BreadcrumbSeparator className="text-primary font-medium text-lg">
                  /
                </BreadcrumbSeparator>
                <BreadcrumbItem className="text-xl font-medium text-primary">
                  <BreadcrumbPage>{subcategoryName}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </>
  );
};
