import { NextRequest, NextResponse } from 'next/server'
import getSession from '@/lib/get-session'
import { createProduct } from '@/server/db/products'

import { productSchema } from '@/api/schemas/product'
export async function POST(request: NextRequest) {
  const session = await getSession()

  if (!session || session.user.type !== 'SUPPLIER') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    const validatedData = productSchema.parse(body)

    const product = await createProduct(validatedData)

    return NextResponse.json({ message: 'Product created successfully', data: product }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Error creating product', error }, { status: 400 })
  }
}
