import { Product } from '@/api/schemas/product'
import prisma from '@/lib/prisma'

export async function createProduct(product: Product) {
  return await prisma.product.create({
    data: {
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      bulkPrice: product.bulkPrice,
      minOrder: product.minOrder,
      leadTime: product.leadTime,
      certifications: product.certifications
    }
  })
}

export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: { id: parseInt(id) }
  })
}
