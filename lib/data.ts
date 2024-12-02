export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  products: Product[];
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Elektronika",
    products: [
      { id: "e1", name: "Smartfon XYZ", price: 999.99, image: "/placeholder.svg?height=200&width=200" },
      { id: "e2", name: "Laptop ABC", price: 1499.99, image: "/placeholder.svg?height=200&width=200" },
      { id: "e3", name: "Słuchawki QWE", price: 199.99, image: "/placeholder.svg?height=200&width=200" },
      { id: "e4", name: "Tablet RST", price: 699.99, image: "/placeholder.svg?height=200&width=200" },
      { id: "e5", name: "Smartwatch UVW", price: 299.99, image: "/placeholder.svg?height=200&width=200" },
    ],
  },
  {
    id: "clothing",
    name: "Odzież",
    products: [
      { id: "c1", name: "Koszulka Classic", price: 29.99, image: "/placeholder.svg?height=200&width=200" },
      { id: "c2", name: "Jeansy Slim", price: 79.99, image: "/placeholder.svg?height=200&width=200" },
      { id: "c3", name: "Bluza Hoodie", price: 59.99, image: "/placeholder.svg?height=200&width=200" },
      { id: "c4", name: "Sukienka Elegance", price: 89.99, image: "/placeholder.svg?height=200&width=200" },
      { id: "c5", name: "Kurtka Zimowa", price: 129.99, image: "/placeholder.svg?height=200&width=200" },
    ],
  },
  {
    id: "home",
    name: "Dom i Ogród",
    products: [
      { id: "h1", name: "Lampa stołowa", price: 49.99, image: "/placeholder.svg?height=200&width=200" },
      { id: "h2", name: "Zestaw pościeli", price: 89.99, image: "/placeholder.svg?height=200&width=200" },
      { id: "h3", name: "Doniczka ceramiczna", price: 19.99, image: "/placeholder.svg?height=200&width=200" },
      { id: "h4", name: "Obraz dekoracyjny", price: 69.99, image: "/placeholder.svg?height=200&width=200" },
      { id: "h5", name: "Dywan pluszowy", price: 119.99, image: "/placeholder.svg?height=200&width=200" },
    ],
  },
];

