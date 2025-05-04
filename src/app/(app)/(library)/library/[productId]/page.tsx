import { LibraryView } from "@/modules/library/ui/views/library-view";
import { ProductView } from "@/modules/library/ui/views/product-view";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";
import React from "react";

interface LibraryProductIdPageProps {
  params: Promise<{ productId: string }>;
}

const LibraryProductIdPage = async ({ params }: LibraryProductIdPageProps) => {
  const { productId } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.library.getOne.queryOptions({
      id: productId,
    })
  );

  void queryClient.prefetchQuery(
    trpc.review.getOne.queryOptions({
      productId,
    })
  );

  return (
    <HydrateClient>
      <ProductView productId={productId} />
    </HydrateClient>
  );
};

export default LibraryProductIdPage;
