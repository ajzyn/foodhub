import QuickActions from './quick-actions'
import Alert from './alert'

export default function HomePage() {
  return (
    <>
      <Alert />

      <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Restaurant Supply Platform</h1>
      <p className="text-gray-600 mb-8">Streamline your supply chain and grow your business</p>

      <div className="mb-8">
        <QuickActions />
      </div>
    </>
  )
}
