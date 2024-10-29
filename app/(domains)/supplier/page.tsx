import getSession from '@/lib/getSession'

export default async function SupplierPage() {
  const session = await getSession()
  console.log(session?.user)

  return <div>SupplierPage</div>
}
