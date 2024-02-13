import React, { useEffect, useState } from 'react'
import ProductCard from "./ProductCard"
import { homeAPI } from "../../shared/constants"
import ProductsGrid from "../Shared/ProductsGrid"
import { useCommerceStore } from "../../store"

function ProductList() {

    const { favorites, searchFilter,
        categoryFilter, productSorting } = useCommerceStore()

    const [products, setProducts] = useState([])
console.log('fav:',favorites)
    useEffect(() => {
        // api/v1/products/filter?categoryFilter=clothes&searchFilter=table
        let query = '?'
        if (searchFilter) {
            query += "&searchFilter=" + searchFilter
        }
        if (categoryFilter) {
            query += '&categoryFilter=' + categoryFilter
        }
        if (productSorting) {
            query += '&productSorting=' + productSorting
        }

        fetch(homeAPI + '/products/filter' + query)
            .then((response) => { return response.json() })
            .then((response: any) => {
                console.log(response)
                // TODO check if response no errors
                setProducts(response)
            })
    }, [categoryFilter, searchFilter, productSorting])

    return (
        <div className="flex flex-col items-start px-6">
            <div>Products</div>
            <ProductsGrid>
                {
                    products.map((product: any) => (
                        <>
                            <ProductCard key={product._id} product={product} />
                        </>
                    ))
                }
            </ProductsGrid>
        </div>

    )
}

export default ProductList