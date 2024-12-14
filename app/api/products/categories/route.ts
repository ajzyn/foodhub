import { getCategories } from '@/api/products'
import { auth } from '@/lib/auth'

import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const categories = await getCategories()

    return NextResponse.json(
      {
        message: 'Products fetched successfully',
        data: categories
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching products', error }, { status: 400 })
  }
}
