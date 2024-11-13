import { CacheKeys } from '@/api/cache-keys'
import { getProductById } from '@/api/products'
import EditProductForm from '@/domains/supplier/pages/products/edit-product'
import { useCheckSupplierAuthentication } from '@/hooks/use-check-supplier-auth'
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query'

export default async function EditProduct({ params }: { params: { id: string } }) {
  await useCheckSupplierAuthentication()

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
