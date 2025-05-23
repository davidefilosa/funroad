import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";
import type { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/hooks/searchParams";
import { ProductListView } from "@/modules/products/ui/views/product-list.view";

interface HomeProps {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<SearchParams>;
}

const Home = async ({ params, searchParams }: HomeProps) => {
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
      <ProductListView />
    </HydrateClient>
  );
};

export default Home;
