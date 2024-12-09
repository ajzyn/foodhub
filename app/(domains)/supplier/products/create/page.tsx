import ProductForm from '@/app/(domains)/supplier/products/components/product-form'
import { Category } from '@prisma/client'

export default async function CreateProduct({ searchParams }: { searchParams: { category: Category } }) {
  const category = Object.values(Category).includes(searchParams.category) ? searchParams.category : undefined

  return (
    <>
      <h2 className="my-10 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">Dodaj produkt do oferty</h2>
      <ProductForm category={category} />
    </>
  )
}
