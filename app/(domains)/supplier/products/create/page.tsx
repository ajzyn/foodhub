import ProductForm from '@/domains/supplier/pages/products/product-form'
import { UserType } from '@prisma/client'
import { redirect } from 'next/navigation'
import getSession from '@/lib/get-session'

export default async function CreateProduct() {
  const session = await getSession()

  if (!session || session.user.type !== UserType.SUPPLIER) {
    redirect('/sign-in')
  }

  return (
    <>
      <h2 className="my-10 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">Dodaj produkt do oferty</h2>
      <ProductForm />
    </>
  )
}
