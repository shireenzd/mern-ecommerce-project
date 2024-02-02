import React, { useEffect, useState } from 'react'
import ProductCard from "./ProductCard"
import { homeURL } from "../../shared/constants"

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
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 justify-items-center">
            {
                products.map((product:any) => (
                    <>
                    <ProductCard key={product._id} product={product} />
                    </>
                ))
            }
        </div>
    )
}

export default ProductList