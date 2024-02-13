import React from 'react'
import ProductCarousel from "../Products/ProductCarousel"
import { BsHeartFill } from "react-icons/bs"
import { blackButtonStyle, homeAPI, redButtonStyle } from "../../shared/constants"
import { useCommerceStore } from "../../store"

function StoreProduct({ product }: { product: any }) {
    const {
        token,
        setOnConfirm,
        setShowConfirmModal
    } = useCommerceStore()

    const deleteProduct = async () => {
        const response = await fetch(homeAPI + '/products/delete/' + product._id, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            setShowConfirmModal(false)
            const result = await response.json
            console.log(result)
        }
    }


    return (
        <div className="flex flex-col w-44 h-[280px] overflow-clip rounded-xl shadow-md">
            <div className="top h-[60%] relative">
                <ProductCarousel pictures={product.pictures} />
                <div className="absolute top-2 left-2 leading-none text-sm">Store name</div>
                <BsHeartFill className="absolute bottom-2 right-2 BsHeart-main" />
            </div>
            <div className="bottom px-2 py-2 h-[40%] flex flex-col justify-between">
                <span className="flex justify-between gap-4 items-center font-bold">
                    <h3 title={product.name} className="text-start text-xs truncate">{product.name}</h3>
                    <h3 className="text-end text-xs">${product.price}</h3>
                </span>
                <p className="text-xs mt-1 overflow-y-scroll">
                    {product.description}
                </p>
                <span className="flex justify-end">
                    {/* will do nothing if _id is undefined */}
                    <button onClick={() => { setOnConfirm(deleteProduct); setShowConfirmModal(true) }} type="button" className={redButtonStyle + " text-xs font-bold"}>Remove</button>
                    <button onClick={() => { }} type="button" className={blackButtonStyle + " text-xs font-bold"}>Edit</button>
                </span>
            </div>
        </div>
    )
}

export default StoreProduct