import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";
import { caller, getQueryClient, HydrateClient, trpc } from "@/trpc/server";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { category } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category })
  );

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong...</div>}>
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList category={category} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default CategoryPage;
