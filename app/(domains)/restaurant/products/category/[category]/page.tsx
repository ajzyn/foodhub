import { getProductsByCategory } from '@/server/db/products'

export default async function CategoryPage({ params }: { params: { categoryName: string } }) {
  console.log('params', params)
  const { categoryName } = params

  const products = await getProductsByCategory(categoryName)
  console.log(products, categoryName)
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
