import React, { useState } from 'react'
import AddProductForm from "../components/Forms/AddProductForm"
import ProductCard from "../components/Products/ProductCard"
import { defaultProduct } from "../shared/constants"

function AddProductsPage() {
    const [product, setProduct] = useState(defaultProduct)

    return (
        <div className="flex justify-center gap-4">
            <div className="pl-6 w-[300px]">
                <AddProductForm setProduct={setProduct} product={product} />
            </div>
            <div className="flex justify-center items-center pr-6">
                <ProductCard product={product} />
            </div>
        </div>
    )
}

export default AddProductsPage