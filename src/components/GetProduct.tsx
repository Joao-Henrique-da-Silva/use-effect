import { useEffect, useState } from "react"

interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}

export const GetProduct = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Usando API que está funcionando
                const response = await fetch("https://dummyjson.com/products?limit=12")
                const data = await response.json()
                
                // Converte para o formato esperado
                const formattedProducts = data.products.map((p: any) => ({
                    id: p.id,
                    title: p.title,
                    price: p.price,
                    description: p.description,
                    category: p.category,
                    image: p.thumbnail,
                    rating: {
                        rate: p.rating,
                        count: p.stock
                    }
                }))
                setProducts(formattedProducts)
            } catch (err) {
                setError("Erro ao carregar produtos")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-gray-600">Carregando produtos...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                {error}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                    <div className="h-48 flex items-center justify-center p-4 bg-gray-50">
                        <img 
                            src={product.image} 
                            alt={product.title}
                            className="h-full object-contain"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
                        <p className="text-gray-600 text-sm mb-2 capitalize">{product.category}</p>
                        <p className="text-2xl font-bold text-green-600">R$ {product.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-yellow-500">⭐</span>
                            <span className="text-sm">{product.rating.rate}</span>
                            <span className="text-xs text-gray-500">({product.rating.count} vendidos)</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}