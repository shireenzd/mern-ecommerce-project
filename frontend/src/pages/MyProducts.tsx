import React, { useEffect, useState } from 'react'
import { homeAPI } from "../shared/constants"
import { useCommerceStore } from "../store"
import ProductCard from "../components/Products/ProductCard"
import StoreProduct from "../components/Store/StoreProduct"
import ProductsGrid from "../components/Shared/ProductsGrid"

function MyProducts() {


    const {
        token
    } = useCommerceStore()

    const [myProducts, setMyProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(homeAPI + '/products/mine/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                const result = await response.json()
                setMyProducts(result)
            }
        }
        fetchProducts()
    }, [])


    return (
        <div className="flex flex-col h-screen items-start px-6">
            <div>MyProducts</div>
            {myProducts.length ?
                <ProductsGrid>
                    {myProducts.map((product: any) => {
                        return <StoreProduct key={product._id} product={product} />
                    })}
                </ProductsGrid>
                : <h1 className="m-auto">You have no products yet!</h1>}
        </div>
    )
}

export default MyProducts