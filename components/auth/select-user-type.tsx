'use client'

import { Label } from '@radix-ui/react-label'
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import { Truck, UtensilsCrossed } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { UserType } from '@prisma/client'
import { useRouter } from 'next/navigation'

export default function SelectUserType() {
  const router = useRouter()
  const [accountType, setAccountType] = useState<UserType>()

  const handleValueChange = (e: string) => {
    setAccountType(e as UserType)
  }

  const handleNavigate = () => {
    if (!accountType) return
    // const path = `${process.env.NEXT_PUBLIC_SCHEME}${accountType.toLocaleLowerCase()}.${
    //   process.env.NEXT_PUBLIC_DOMAIN
    // }/auth/sign-up`
    // window.location.href = path
    router.push(`/auth/sign-up?type=${accountType}`)
  }

  return (
    <>
      <h2 className="text-md mb-4 text-center">Wybierz typ konta</h2>
      <RadioGroup onValueChange={handleValueChange} className="grid grid-cols-2 gap-4">
        <div>
          <RadioGroupItem value={UserType.RESTAURANT} id="restaurant" className="peer sr-only" />
          <Label
            htmlFor="restaurant"
            className="cursor-pointer flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <UtensilsCrossed className="mb-3 h-6 w-6" />
            Restauracja
          </Label>
        </div>
        <div>
          <RadioGroupItem value={UserType.SUPPLIER} id="supplier" className="peer sr-only" />
          <Label
            htmlFor="supplier"
            className="cursor-pointer flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Truck className="mb-3 h-6 w-6" />
            Dostawca
          </Label>
        </div>
      </RadioGroup>

      <Button onClick={handleNavigate} className="w-full mt-6">
        Kontynuuj
      </Button>
    </>
  )
}
