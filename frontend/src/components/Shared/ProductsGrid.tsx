import React from 'react'

function ProductsGrid({ children }: any) {
    return (
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 justify-items-center">
            {children}
        </div>
    )
}

export default ProductsGrid