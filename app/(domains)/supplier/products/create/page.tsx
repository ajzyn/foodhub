import ProductForm from '@/app/(domains)/supplier/products/components/product-form'
import { getCategories } from '@/server/db/products'
import { Category } from '@prisma/client'

export default async function CreateProduct({ searchParams }: { searchParams: { category: string } }) {
  const categories = await getCategories()

  const category = categories.find((c) => c.name === searchParams.category)

  return (
    <>
      <h2 className="my-10 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">Dodaj produkt do oferty</h2>
      <ProductForm category={category} categories={categories} />
    </>
  )
}
