import React, { useState } from 'react'
import AddProductForm from "../components/Forms/AddProductForm"
import ProductCard from "../components/Products/ProductCard"
import { defaultProduct } from "../shared/constants"

function AddProductsPage() {
    const [product, setProduct] = useState(defaultProduct)

    const shadowCard = {
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
    }

    const addProduct={
        backgroundImage: 'url(/addProduct.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width:'100%',
        height:'80vh'
    }
 

    return (
        <div className="flex relative justify-center mt-10 mb-4 items-center gap-12" style={addProduct}>
            <div className="">
                <AddProductForm setProduct={setProduct} product={product} />
            </div>
            <div className="flex justify-center items-center rounded-xl
             box">
                <ProductCard product={product} />
            </div>
        </div>
    )
}

export default AddProductsPage