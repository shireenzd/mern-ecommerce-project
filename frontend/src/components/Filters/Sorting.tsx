import React from 'react'
import { useCommerceStore } from "../../store"
import { HiSortAscending, HiSortDescending } from "react-icons/hi";

function Sorting() {
    const {
        setProductSorting
    } = useCommerceStore()
    return (
        <div className="flex gap-4">
            <p onClick={() => setProductSorting(1)} className="cursor-pointer mt-[1px]"><HiSortAscending size={36}/></p>
            <p onClick={() => setProductSorting(-1)} className="cursor-pointer mt-[1px]"><HiSortDescending size={36}/></p>
        </div>
    )
}

export default Sorting