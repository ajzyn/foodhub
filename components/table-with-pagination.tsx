import { ChevronRight } from 'lucide-react'

import { Table, TableCell, TableBody, TableRow, TableHeader, TableHead } from './ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { ChevronLeft } from 'lucide-react'

interface TableWithPaginationProps<T> {
  columns: {
    header: string
    accessorKey?: keyof T
    cell?: (value: T) => React.ReactNode
  }[]
  data: T[]
  pagination: {
    page: number
    pageSize: number
    totalPages: number
  }
  isLoading?: boolean
}

export default function TableWithPagination<T>({ columns, data, pagination, isLoading }: TableWithPaginationProps<T>) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={String(column.accessorKey)}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                Ładowanie...
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                Brak danych
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={String(column.accessorKey)}>
                    {column.cell ? column.cell(row) : column.accessorKey ? String(row[column.accessorKey]) : null}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm">Elementów na stronę:</p>
          <Select
            value={String(pagination.pageSize)}
            // onValueChange={(value) => pagination.setPageSize(Number(value))}>
            onValueChange={(value) => console.log(value)}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            // onClick={() => pagination.setPage(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Strona {pagination.page} z {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            // onClick={() => pagination.setPage(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
