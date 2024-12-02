import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import { Product } from '@prisma/client'
import isEmpty from 'lodash/isEmpty'

export default function ProductTable({ products }: { products: Product[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nazwa</TableHead>
          <TableHead>Cena</TableHead>
          <TableHead>Stan</TableHead>
          <TableHead>Akcje</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isEmpty(products) ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              Brak produktów
            </TableCell>
          </TableRow>
        ) : (
          products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="hover:text-info">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
