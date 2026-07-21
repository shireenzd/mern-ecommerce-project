import React, { useCallback, useEffect, useState } from 'react'
import { homeAPI, homeURL } from "../shared/constants"
import { useCommerceStore } from "../store"
import StoreProduct from "../components/Store/StoreProduct"
import ProductsGrid from "../components/Shared/ProductsGrid"
import { useNavigate } from "react-router-dom"

function MyProducts() {
    const navigate = useNavigate()
    const { token } = useCommerceStore()

    const [store, setStore] = useState<any>(null)
    const [myProducts, setMyProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchProducts = useCallback(async () => {
        if (!token) return

        setLoading(true)
        setError('')

        try {
            const response = await fetch(homeAPI + '/products/mine/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()

            if (!response.ok || data?.error) {
                throw new Error(data?.error || 'Failed to load your products')
            }

            // Support both legacy array responses and { store, products }
            if (Array.isArray(data)) {
                setMyProducts(data)
                const storeFromProduct = data[0]?.store
                setStore(typeof storeFromProduct === 'object' ? storeFromProduct : null)
            } else {
                setStore(data.store ?? null)
                setMyProducts(Array.isArray(data.products) ? data.products : [])
            }
        } catch (err: any) {
            setStore(null)
            setMyProducts([])
            setError(err.message || 'Failed to load your products')
        } finally {
            setLoading(false)
        }
    }, [token])

    useEffect(() => {
        if (!token) {
            navigate('/auth/login')
            return
        }
        fetchProducts()
    }, [token, navigate, fetchProducts])

    const handleProductDeleted = (productId: string) => {
        setMyProducts((current) => current.filter((product) => product._id !== productId))
    }

    const handleProductUpdated = (updatedProduct: any) => {
        setMyProducts((current) =>
            current.map((product) => product._id === updatedProduct._id ? updatedProduct : product)
        )
    }

    return (
        <div className="flex min-h-screen flex-col items-stretch gap-6 px-6 py-6 text-left">
            {store && (
                <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                        {store.logo ? (
                            <img
                                className="h-full w-full object-cover"
                                src={homeURL + store.logo}
                                alt={`${store.name} logo`}
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                No logo
                            </div>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">{store.name}</h1>
                        <p className="mt-1 text-sm text-gray-600">{store.description}</p>
                        {store.location && (
                            <p className="mt-1 text-sm text-gray-500">{store.location}</p>
                        )}
                    </div>
                    <div className="text-sm text-gray-500">
                        {myProducts.length} product{myProducts.length === 1 ? '' : 's'}
                    </div>
                </div>
            )}

            {!store && !loading && !error && (
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900">My Products</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage the products in your store.</p>
                </div>
            )}

            {loading && (
                <div className="rounded-xl border border-dashed border-gray-300 px-4 py-16 text-center text-sm text-gray-500">
                    Loading your products...
                </div>
            )}

            {!loading && error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-700">
                    {error}
                </div>
            )}

            {!loading && !error && myProducts.length === 0 && (
                <div className="rounded-xl border border-dashed border-gray-300 px-4 py-16 text-center text-sm text-gray-500">
                    You have no products yet. Go to Sell to add your first product.
                </div>
            )}

            {!loading && !error && myProducts.length > 0 && (
                <ProductsGrid>
                    {myProducts.map((product: any) => (
                        <StoreProduct
                            key={product._id}
                            product={product}
                            storeName={store?.name}
                            onDeleted={handleProductDeleted}
                            onUpdated={handleProductUpdated}
                        />
                    ))}
                </ProductsGrid>
            )}
        </div>
    )
}

export default MyProducts
