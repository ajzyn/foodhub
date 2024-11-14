'use client'

import { CacheKeys } from '@/api2/cache-keys'
import { getProductById } from '@/api2/products'
import ErrorAlert from '@/components/error-alert'
import ProductForm from '@/domains/supplier/pages/products/product-form'
import { useQuery } from '@tanstack/react-query'

export default function EditProduct({ productId }: { productId: string }) {
  const { data, error } = useQuery({
    queryKey: [CacheKeys.PRODUCT, productId],
    queryFn: () => getProductById(productId)
  })

  if (error) return <ErrorAlert />

  return <ProductForm product={data} />
}
