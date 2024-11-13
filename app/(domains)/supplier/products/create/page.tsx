import ProductForm from '@/domains/supplier/pages/products/product-form'
import { useCheckSupplierAuthentication } from '@/hooks/use-check-supplier-auth'

export default async function CreateProduct() {
  await useCheckSupplierAuthentication()

  return (
    <>
      <h2 className="my-10 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">Dodaj produkt do oferty</h2>
      <ProductForm />
    </>
  )
}
