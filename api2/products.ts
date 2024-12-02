import fetchFromApi from '@/lib/fetchFromAPI'
import { Category, Product } from '@prisma/client'

export async function addProduct(product: Product): Promise<Product> {
  const response = await fetchFromApi('/products', {
    method: 'POST',
    body: JSON.stringify(product)
  })
  return response.data
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetchFromApi(`/products/${id}`)
  return response.data
}

export async function getProducts(category: Category): Promise<Product[]> {
  const response = await fetchFromApi(`/products?category=${category}`)
  return response.data
}
