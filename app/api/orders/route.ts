import getSession from '@/lib/get-session'
import { getOrders, getTotalOrders } from '@/server/db/orders'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const session = await getSession()

  if (!session || session.user.type !== 'SUPPLIER') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const page = Number(searchParams.get('page')) || 1
  const pageSize = Number(searchParams.get('pageSize')) || 10
  const search = searchParams.get('search') || ''

  try {
    const orders = await getOrders({ page, pageSize, search })
    const totalOrders = await getTotalOrders({ search })

    const totalPages = Math.ceil(totalOrders / pageSize)

    return NextResponse.json(
      {
        message: 'Orders fetched successfully',
        data: orders,
        pagination: {
          currentPage: page,
          pageSize,
          totalPages,
          totalItems: orders
        }
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching orders', error }, { status: 400 })
  }
}
