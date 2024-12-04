'use client'

import { CacheKeys } from '@/api/cache-keys'
import { getProductById } from '@/api/products'
import ErrorAlert from '@/components/error-alert'
import ProductForm from '@/domains/supplier/pages/products/product-form'
import { useQuery } from '@tanstack/react-query'

export default function EditProduct({ productId }: { productId: string }) {
  const { data, error } = useQuery({
    queryKey: [CacheKeys.PRODUCT, productId],
    queryFn: () => getProductById(productId)
  })

  //TODO: sprawdzić errrora

  if (error) return <ErrorAlert />

  return <ProductForm product={data} />
}
