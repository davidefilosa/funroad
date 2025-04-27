import { ProductView } from "@/modules/products/ui/views/product-view";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

interface ProductIdPageProps {
  params: Promise<{
    productId: string;
    slug: string;
  }>;
}
const ProductIdPage = async ({ params }: ProductIdPageProps) => {
  const { productId, slug } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getOne.queryOptions({ id: productId })
  );

  return (
    <HydrateClient>
      <ProductView productId={productId} slug={slug} />
    </HydrateClient>
  );
};

export default ProductIdPage;
