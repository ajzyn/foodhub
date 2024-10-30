'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function SupplierPage() {
  const { data: session } = useSession()
  console.log(session)

  return (
    <>
      <div>SupplierPage</div>
      <Link href="/about">About</Link>
    </>
  )
}
