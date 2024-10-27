import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/images/logo.png" alt="SupplyConnect" width={40} height={40} className="rounded-md" />
        <span className="text-xl font-bold">SupplyConnect</span>
      </Link>
      <nav className="space-x-4">
        <Button variant="ghost">Login</Button>
        <Button>Register</Button>
      </nav>
    </header>
  )
}
