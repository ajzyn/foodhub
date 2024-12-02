import { CacheKeys } from '@/api2/cache-keys'
import { getProductById } from '@/api2/products'
import EditProductForm from '@/domains/supplier/pages/products/edit-product'
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query'

export default async function EditProduct({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [CacheKeys.PRODUCT, params.id],
    queryFn: () => getProductById(params.id)
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <h2 className="my-10 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">Edytuj produkt</h2>
      <EditProductForm productId={params.id} />
    </HydrationBoundary>
  )
}
