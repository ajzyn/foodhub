import fetchFromApi from '@/lib/fetch-from-api'
import { Category } from '@prisma/client'
import { CacheKeys } from './cache-keys'
import { RevalidateTime } from '@/data/revalidate-time'
import { ResponseParams } from '@/types/api/response'

export async function getCategories(opt?: RequestInit) {
  return await fetchFromApi<ResponseParams<Category[]>>('/products/categories', opt)
}

export async function getCachedCategories() {
  return await getCategories({
    next: {
      tags: [CacheKeys.CATEGORIES],
      revalidate: RevalidateTime.ONE_DAY
    }
  })
}
