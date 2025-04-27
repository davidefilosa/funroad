import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";
import type { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/hooks/searchParams";
import { ProductListView } from "@/modules/products/ui/views/product-list.view";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<SearchParams>;
}

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const { category } = await params;
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      category,
      ...filters,
      limit: 10,
    })
  );

  return (
    <HydrateClient>
      <ProductListView category={category} />
    </HydrateClient>
  );
};

export default CategoryPage;
