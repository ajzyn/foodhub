import { Facebook, Instagram, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-4">
          <Link href="#" className="text-muted-foreground hover:text-primary">
            About Us
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            Terms of Service
          </Link>
        </div>
        <div className="space-x-6 flex">
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Facebook className="h-6 w-6" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Twitter className="h-6 w-6" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Instagram className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
