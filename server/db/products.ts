import { Product } from '@/api2/schemas/product'
import prisma from '@/lib/prisma'
import { Category } from '@prisma/client'

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
      certifications: product.certifications,
      stock: product.stock
    }
  })
}

export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: { id: parseInt(id) }
  })
}

export async function getProducts(category: Category) {
  return await prisma.product.findMany({
    where: { category }
  })
}
