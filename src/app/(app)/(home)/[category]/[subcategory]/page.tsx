import { ProductListSkeleton } from "@/modules/products/ui/components/product-list";
import { ProductListView } from "@/modules/products/ui/views/product-list.view";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
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
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      category: subcategory,
      limit: 10,
    })
  );

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong...</div>}>
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductListView category={subcategory} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default SubcategoryPage;
