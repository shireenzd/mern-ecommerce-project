import React from 'react'
import { useCommerceStore } from "../../store"

function Sorting() {
    const {
        productSorting,
        setProductSorting
    } = useCommerceStore()

    const base = "cursor-pointer rounded-md px-2 py-1 text-xs font-medium transition"
    const active = "bg-gray-900 text-white"
    const idle = "bg-gray-100 text-gray-600 hover:bg-gray-200"

    return (
        <div className="flex shrink-0 gap-1">
            <button
                type="button"
                onClick={() => setProductSorting(1)}
                className={`${base} ${productSorting === 1 ? active : idle}`}
            >
                ASC
            </button>
            <button
                type="button"
                onClick={() => setProductSorting(-1)}
                className={`${base} ${productSorting === -1 ? active : idle}`}
            >
                DESC
            </button>
        </div>
    )
}

export default Sorting
