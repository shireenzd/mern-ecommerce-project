import React from 'react'

function ProductCard({product}:{product:any}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>ProductCard:{product._id}</span>
            <span>Name:{product.name}</span>
            <span>Price:{product.price}</span>
            <span>Description:{product.description}</span>
        </div>
    )
}

export default ProductCard