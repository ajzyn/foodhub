import axios from '@/lib/axios'
import { Product } from '@prisma/client'

export async function addProduct(product: Product): Promise<Product> {
  const response = await axios.post('/products', product)
  return response.data
}

export async function getProductById(id: string): Promise<Product> {
  const response = await axios.get(`/products/${id}`)
  return response.data
}
