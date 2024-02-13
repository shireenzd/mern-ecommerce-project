import React from 'react'
import { useCommerceStore } from "../../store"

function Sorting() {
    const {
        setProductSorting
    } = useCommerceStore()
    return (
        <div className="flex gap-4">
            <p onClick={() => setProductSorting(1)} className="cursor-pointer">ASC</p>
            <p onClick={() => setProductSorting(-1)} className="cursor-pointer">DESC</p>
        </div>
    )
}

export default Sorting