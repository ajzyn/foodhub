'use client'

import { useSession } from 'next-auth/react'

export default function SupplierPage() {
  const { data: session } = useSession()
  console.log(session)

  return <div>SupplierPage</div>
}
