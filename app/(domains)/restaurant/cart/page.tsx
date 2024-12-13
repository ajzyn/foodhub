import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CartPage() {
  const cartItems = [
    { id: 1, name: 'Produkt 1', quantity: 2, price: 19.99 },
    { id: 2, name: 'Produkt 2', quantity: 1, price: 29.99 }
  ]

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Twój Koszyk</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produkt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ilość</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cena</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suma</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.price.toFixed(2)} zł</td>
                <td className="px-6 py-4 whitespace-nowrap">{(item.quantity * item.price).toFixed(2)} zł</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50">
              <td colSpan={3} className="px-6 py-4 text-right font-bold">
                Suma:
              </td>
              <td className="px-6 py-4 font-bold">{total.toFixed(2)} zł</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="mt-8 flex justify-between">
        <Link href="/">
          <Button variant="outline">Kontynuuj zakupy</Button>
        </Link>
        <Button>Przejdź do kasy</Button>
      </div>
    </div>
  )
}
