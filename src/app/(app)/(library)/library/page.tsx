import { LibraryView } from "@/modules/library/ui/views/library-view";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";
import React from "react";

const LibraryPage = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.library.getMany.infiniteQueryOptions({
      cursor: 1,
      limit: 10,
    })
  );

  return (
    <HydrateClient>
      <LibraryView />
    </HydrateClient>
  );
};

export default LibraryPage;
