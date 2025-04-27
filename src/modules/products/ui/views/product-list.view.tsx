import { ProductSort } from "../components/product-sort";
import { ProductFilters } from "../components/product-filter";
import { ProductList, ProductListSkeleton } from "../components/product-list";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface CategoryPageProps {
  category?: string;
  slug?: string;
}

export const ProductListView = ({ category, slug }: CategoryPageProps) => {
  return (
    <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
      <ProductSort />
      <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
        <div className="lg:col-span-2 xl:col-span-2 relative">
          <ProductFilters />
        </div>
        <div className="lg:col-span-4 xl:col-span-6">
          <ErrorBoundary fallback={<div>Something went wrong...</div>}>
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList category={category} slug={slug} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};
