'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

interface CartItem {
  id: number
  name: string
  quantity: number
  price: number
}

export default function CartPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Produkt 1', quantity: 2, price: 19.99 },
    { id: 2, name: 'Produkt 2', quantity: 1, price: 29.99 }
  ])

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0)
    )
  }

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="fixed bottom-4 right-4 z-50">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Koszyk ({cartItems.length})
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Twój koszyk</SheetTitle>
          <SheetDescription>Przegląd produktów w Twoim koszyku</SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">{item.price.toFixed(2)} zł</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, -1)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) - item.quantity)}
                  className="w-16 text-center"
                />
                <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => removeItem(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <div className="pt-4 border-t">
            <p className="font-bold text-lg">Suma: {total.toFixed(2)} zł</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <Link href="/koszyk" passHref>
            <Button className="w-full" onClick={() => setIsOpen(false)}>
              Kontynuuj składanie zamówienia
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
