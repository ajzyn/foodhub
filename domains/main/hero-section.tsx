import { BarChart3, Clipboard, TrendingUp } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Clipboard className="mx-auto h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Streamlined Ordering</h3>
            <p className="text-muted-foreground">Effortlessly place and manage orders with your preferred suppliers</p>
          </div>
          <div className="text-center">
            <BarChart3 className="mx-auto h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Supply Management</h3>
            <p className="text-muted-foreground">Keep track of inventory and manage your supply chain efficiently</p>
          </div>
          <div className="text-center">
            <TrendingUp className="mx-auto h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Insightful Analytics</h3>
            <p className="text-muted-foreground">
              Gain valuable insights into your ordering patterns and supplier performance
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
