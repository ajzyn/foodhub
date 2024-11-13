import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default function QuickActions() {
  const lastOrders = [
    { id: 'ORD001', customer: 'Cafe Bistro', total: '$245.50', status: 'Delivered' },
    { id: 'ORD002', customer: 'Gourmet Restaurant', total: '$540.00', status: 'Processing' },
    { id: 'ORD003', customer: 'Quick Bites', total: '$125.75', status: 'Pending' }
  ]

  const lastMessages = [
    { id: 'MSG001', from: 'Cafe Bistro', subject: 'Order Inquiry', date: '2023-05-10' },
    { id: 'MSG002', from: 'Support Team', subject: 'Account Verification', date: '2023-05-09' },
    { id: 'MSG003', from: 'Gourmet Restaurant', subject: 'Delivery Confirmation', date: '2023-05-08' }
  ]

  return (
    <>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Last Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lastOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === 'Delivered'
                            ? 'default'
                            : order.status === 'Processing'
                            ? 'secondary'
                            : 'default'
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Last Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lastMessages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>{message.from}</TableCell>
                    <TableCell>{message.subject}</TableCell>
                    <TableCell>{message.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
