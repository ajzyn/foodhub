import { useState } from 'react'

export function usePagination(defaultPageSize = 10) {
  //TODO: store last visited page in local storage
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  return { page, setPage, pageSize, setPageSize }
}
