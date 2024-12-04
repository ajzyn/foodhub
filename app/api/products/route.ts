import { NextRequest, NextResponse } from 'next/server'
import getSession from '@/lib/get-session'
import { createProduct, getProducts, getTotalProducts } from '@/server/db/products'

import { productSchema } from '@/api/schemas/product'
import { Category } from '@prisma/client'

export async function POST(request: NextRequest) {
  const session = await getSession()

  if (!session || session.user.type !== 'SUPPLIER') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    console.log(body)
    console.log(session)

    const validatedData = productSchema.parse(body)

    const product = await createProduct(validatedData, session.user.id)

    return NextResponse.json({ message: 'Product created successfully', data: product }, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error creating product', error }, { status: 400 })
  }
}

export async function GET(request: NextRequest) {
  const session = await getSession()

  if (!session || session.user.type !== 'SUPPLIER') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category') as Category
  const page = Number(searchParams.get('page')) || 1
  const pageSize = Number(searchParams.get('pageSize')) || 10
  const search = searchParams.get('search') || ''

  try {
    const products = await getProducts(category, { page, pageSize, search })

    const totalProducts = await getTotalProducts(category, { page, pageSize, search })

    const totalPages = Math.ceil(totalProducts / pageSize)

    return NextResponse.json(
      {
        message: 'Products fetched successfully',
        data: products,
        pagination: { currentPage: page, pageSize, totalPages, totalItems: products }
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching products', error }, { status: 400 })
  }
}
