import { getQueryClient, trpc } from "@/trpc/server";
export default async function Home() {
  const queryClient = getQueryClient();
  const categories = await queryClient.fetchQuery(
    trpc.categories.getMany.queryOptions()
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      {JSON.stringify(categories, null, 2)}
    </div>
  );
}
