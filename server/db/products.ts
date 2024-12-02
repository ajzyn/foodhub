import { Product } from '@/api2/schemas/product'
import prisma from '@/lib/prisma'
import { PaginationDBParams } from '@/types/pagination'
import { Category } from '@prisma/client'

export async function createProduct(product: Product, supplierId: string) {
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
      stock: product.stock,
      supplier: {
        connect: { id: supplierId }
      }
    }
  })
}

export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: { id }
  })
}

export async function getProducts(category: Category, paginationParams: PaginationDBParams) {
  return await prisma.product.findMany({
    skip: (paginationParams.page - 1) * paginationParams.pageSize,
    take: paginationParams.pageSize,
    where: {
      category,
      name: { contains: paginationParams.search, mode: 'insensitive' }
    },
    orderBy: { name: 'desc' }
  })
}

export async function getTotalProducts(category: Category, paginationParams: PaginationDBParams) {
  return await prisma.product.count({
    where: { category, name: { contains: paginationParams.search, mode: 'insensitive' } }
  })
}
