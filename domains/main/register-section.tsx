import { Button } from '@/components/ui/button'

export default function RegisterSection() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Simplify Ordering and Supply Management</h1>
      <p className="text-xl text-muted-foreground mb-8">Connect restaurants with the best suppliers effortlessly</p>
      <div className="flex justify-center space-x-4 mt-10">
        <Button size="lg" variant="outline">
          Login as Restaurant
        </Button>
        <Button size="lg" variant="outline">
          Login as Supplier
        </Button>
      </div>
    </section>
  )
}
