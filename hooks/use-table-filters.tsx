import { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

interface UseDebounceTableProps {
  delayMs?: number
  updateUrl?: boolean
  initialFilters?: Record<string, string | number>
}

interface TableParams {
  page: number
  pageSize: number
  search: string
}

export const useDebounceTable = ({
  delayMs = 1000,
  updateUrl = true,
  initialFilters = {}
}: UseDebounceTableProps = {}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [tableParams, setTableParams] = useState<TableParams>({
    page: parseInt(searchParams.get('page') || '1', 10),
    pageSize: parseInt(searchParams.get('pageSize') || '10', 10),
    search: searchParams.get('search') || ''
  })

  const [additionalFilters, setAdditionalFilters] = useState<Record<string, string | number>>(
    Object.fromEntries(Object.entries(initialFilters).map(([key, value]) => [key, searchParams.get(key) || value]))
  )

  const updateUrlParams = (params: Record<string, string | number | undefined>) => {
    if (!updateUrl) return

    const current = new URLSearchParams(Array.from(searchParams.entries()))

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        current.set(key, String(value))
      } else {
        current.delete(key)
      }
    })

    const search = current.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`)
  }

  const debouncedUpdateParams = debounce(updateUrlParams, delayMs)

  useEffect(() => {
    const allParams = {
      ...tableParams,
      ...additionalFilters
    }

    debouncedUpdateParams(allParams)

    return () => {
      debouncedUpdateParams.cancel()
    }
  }, [tableParams, additionalFilters])

  const setSearch = (search: string) => {
    setTableParams((prev) => ({
      ...prev,
      search,
      page: 1
    }))
  }

  const setPage = (page: number) => {
    setTableParams((prev) => ({ ...prev, page }))
  }

  const setPageSize = (pageSize: number) => {
    setTableParams((prev) => ({
      ...prev,
      pageSize,
      page: 1
    }))
  }

  const setFilter = (key: string, value: string | number | null) => {
    setAdditionalFilters((prev) => {
      const newFilters = { ...prev }

      if (value === null) {
        delete newFilters[key]
      } else {
        newFilters[key] = value
      }

      return newFilters
    })

    setTableParams((prev) => ({ ...prev, page: 1 }))
  }

  return {
    tableParams,
    additionalFilters,
    setSearch,
    setPage,
    setPageSize,
    setFilter
  }
}
