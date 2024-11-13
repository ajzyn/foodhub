import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getProductById } from '@/server/db/products'
import getSession from '@/lib/get-session'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession()
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  console.log(session)
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  console.log(params.id)

  try {
    const product = await getProductById(params.id)

    return NextResponse.json({ message: 'Product fetched successfully', data: product }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 })
  }
}
