import { Product } from '@/api/schemas/product'
import prisma from '@/lib/prisma'
import { PaginationDBParams } from '@/types/pagination'
import { Category, Prisma } from '@prisma/client'

export const createProduct = async (product: Product, supplierId: string) => {
  return await prisma.product.create({
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      bulkPrice: product.bulkPrice,
      minOrder: product.minOrder,
      leadTime: product.leadTime,
      certifications: product.certifications,
      stock: product.stock,
      category: {
        connect: { name: product.category }
      },
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

export async function getProducts(paginationParams: PaginationDBParams, category?: string | null) {
  return await prisma.product.findMany({
    skip: (paginationParams.page - 1) * paginationParams.pageSize,
    take: paginationParams.pageSize,
    where: {
      ...(category
        ? {
            categoryName: {
              contains: category,
              mode: 'insensitive'
            }
          }
        : {}),
      name: {
        contains: paginationParams.search,
        mode: 'insensitive'
      }
    },
    orderBy: { name: 'desc' }
  })
}

export async function getTotalProducts(paginationParams: PaginationDBParams, category?: string | null) {
  return await prisma.product.count({
    where: {
      ...(category
        ? {
            categoryName: {
              contains: category,
              mode: 'insensitive'
            }
          }
        : {}),
      name: { contains: paginationParams.search, mode: 'insensitive' }
    }
  })
}

export async function getCategories() {
  return await prisma.category.findMany()
}

export async function getProductsByCategory(category: string) {
  return await prisma.product.findMany({
    where: { category: { name: category } }
  })
}
