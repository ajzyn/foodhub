import { NextRequest, NextResponse } from 'next/server'
import getSession from '@/lib/get-session'
import { createProduct, getProducts } from '@/server/db/products'

import { productSchema } from '@/api2/schemas/product'
import { Category } from '@prisma/client'

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

export async function GET(request: NextRequest) {
  const session = await getSession()

  if (!session || session.user.type !== 'SUPPLIER') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const category = request.nextUrl.searchParams.get('category') as Category

  try {
    const products = await getProducts(Category.MEAT)

    return NextResponse.json({ message: 'Products fetched successfully', data: products }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching products', error }, { status: 400 })
  }
}
