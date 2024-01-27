import React, { useEffect, useState } from 'react'
import ProductCard from "./ProductCard"
import { homeURL } from "../shared/constants"

function ProductList() {

    const [products, setProducts] = useState([])
    
    useEffect(()=>{
        fetch(homeURL+'/products/list')
        .then((response)=>{ return response.json()})
        .then((response:any)=>{
            console.log(response)
            // TODO check if response no errors
            setProducts(response)
        })
    }, [])

    return (
        <>
            {
                products.map((product:any) => (
                    <ProductCard key={product._id} product={product} />
                ))
            }
        </>
    )
}

export default ProductList