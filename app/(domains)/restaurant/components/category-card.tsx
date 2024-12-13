import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface CategoryCardProps {
  id: string
  image: string
  name: string
  description: string
}

export default function CategoryCard({ image, name, description }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${name}`}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl"
    >
      <div className="aspect-square overflow-hidden">
        <Image
          src={'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80'}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          fill
          priority
          quality={75}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
        <div className="absolute bottom-0 p-6 text-white">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="mt-2 text-sm text-gray-200">{description}</p>
          <div className="mt-4 inline-flex items-between gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors group-hover:bg-white/30">
            <span className="hidden xl:block">Przeglądaj kategorię</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  )
}
