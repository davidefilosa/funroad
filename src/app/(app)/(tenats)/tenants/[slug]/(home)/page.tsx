import { loadProductFilters } from "@/modules/products/hooks/searchParams";
import { ProductListView } from "@/modules/products/ui/views/product-list.view";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";
import { SearchParams } from "nuqs/server";
import React from "react";

interface TenantPageProps {
  searchParams: Promise<SearchParams>;
  params: Promise<{
    slug: string;
  }>;
}

const TenantPage = async ({ params, searchParams }: TenantPageProps) => {
  const { slug } = await params;
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      limit: 10,
      tenantSlug: slug,
    })
  );

  return (
    <HydrateClient>
      <ProductListView slug={slug} />
    </HydrateClient>
  );
};

export default TenantPage;
