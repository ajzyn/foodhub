import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getProductById } from '@/server/db/products'
import { auth } from '@/lib/auth'
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const product = await getProductById(params.id)

    return NextResponse.json({ message: 'Product fetched successfully', data: product }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 })
  }
}
