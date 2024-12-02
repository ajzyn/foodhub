import prisma from '@/lib/prisma'
import { PaginationDBParams } from '@/types/pagination'

export const getOrders = async (paginationParams: PaginationDBParams) => {
  return await prisma.order.findMany({
    skip: (paginationParams.page - 1) * paginationParams.pageSize,
    take: paginationParams.pageSize,
    where: {
      id: { contains: paginationParams.search, mode: 'insensitive' }
    },
    orderBy: { orderDate: 'desc' }
  })
}

export const getTotalOrders = async (paginationParams: Pick<PaginationDBParams, 'search'>) => {
  return await prisma.order.count({
    where: {
      id: { contains: paginationParams.search, mode: 'insensitive' }
    }
  })
}
