import React, { useEffect, useMemo, useState } from 'react'
import ProductCard from "./ProductCard"
import { homeAPI } from "../../shared/constants"
import ProductsGrid from "../Shared/ProductsGrid"
import { useCommerceStore } from "../../store"

function ProductList() {
    const {
        favorites,
        favoritesToggled,
        searchFilter,
        categoryFilter,
        productSorting,
    } = useCommerceStore()

    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const params = new URLSearchParams()
        if (searchFilter) params.set('searchFilter', searchFilter)
        if (categoryFilter) params.set('categoryFilter', categoryFilter)
        if (productSorting) params.set('productSorting', String(productSorting))

        const query = params.toString()
        setLoading(true)
        setError('')

        fetch(homeAPI + '/products/filter' + (query ? `?${query}` : ''))
            .then(async (response) => {
                const data = await response.json()
                if (!response.ok || data?.error) {
                    throw new Error(data?.error || 'Failed to load products')
                }
                if (!Array.isArray(data)) {
                    throw new Error('Unexpected response from server')
                }
                setProducts(data)
            })
            .catch((err) => {
                setProducts([])
                setError(err.message || 'Failed to load products')
            })
            .finally(() => setLoading(false))
    }, [categoryFilter, searchFilter, productSorting])

    const visibleProducts = useMemo(() => {
        if (!favoritesToggled) return products
        return products.filter((product) => favorites.includes(product._id))
    }, [products, favoritesToggled, favorites])

    return (
        <div className="flex flex-col items-stretch gap-4 px-6 py-6 text-left">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Products</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {favoritesToggled ? 'Showing your favorites' : 'Browse the latest items'}
                    </p>
                </div>
                {!loading && !error && (
                    <p className="text-sm text-gray-500">
                        {visibleProducts.length} item{visibleProducts.length === 1 ? '' : 's'}
                    </p>
                )}
            </div>

            {loading && (
                <div className="rounded-xl border border-dashed border-gray-300 px-4 py-16 text-center text-sm text-gray-500">
                    Loading products…
                </div>
            )}

            {!loading && error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-700">
                    {error}
                </div>
            )}

            {!loading && !error && visibleProducts.length === 0 && (
                <div className="rounded-xl border border-dashed border-gray-300 px-4 py-16 text-center text-sm text-gray-500">
                    {favoritesToggled
                        ? 'No favorites yet. Tap the heart on a product to save it.'
                        : 'No products match your filters.'}
                </div>
            )}

            {!loading && !error && visibleProducts.length > 0 && (
                <ProductsGrid>
                    {visibleProducts.map((product: any) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </ProductsGrid>
            )}
        </div>
    )
}

export default ProductList
