import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface SubcategoryPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

const SubcategoryPage = async ({ params }: SubcategoryPageProps) => {
  const { category, subcategory } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category: subcategory })
  );

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong...</div>}>
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList category={subcategory} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default SubcategoryPage;
