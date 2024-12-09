import { useState } from 'react'

export function usePagination(defaultPageSize = 10) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  return { page, setPage, pageSize, setPageSize }
}
