import React from 'react'
import ProductCarousel from "../Products/ProductCarousel"
import { getReadableDate } from "../../shared/utils"
import { blackButtonStyle, grayButtonStyle, greenButtonStyle } from "../../shared/constants"
import { useCommerceStore } from "../../store"

function Order({ order }: any) {

    const {
        setProductBeingReviewed,
        setShowReviewModal
    } = useCommerceStore()

    return (
        <div className="flex flex-col gap-4 border-2 border-black p-6" >
            <span className="flex justify-between">
                <h1>
                    Order date: {getReadableDate(order.createdAt)}
                </h1>
                <h1>Status: {order.status}</h1>
            </span>
            {order.products.map((product: any) => {
                return (
                    <div className="shadow flex justify-between items-center rounded-xl overflow-clip bg-gray-700">
                        <div className="w-[25%]">
                            <ProductCarousel pictures={product.pictures} />
                        </div>
                        <div className="w-[50%]">
                            some description {product._id}
                        </div>
                        <div className="w-[220px] px-10 flex items-center justify-between">
                            <p className="text-2xl">{product.quantity}</p>
                        </div>
                        <div className="flex flex-col justify-end h-full p-2">
                            <button onClick={() => { setProductBeingReviewed(product); setShowReviewModal(true) }} className={('delivered' !== order.status ? grayButtonStyle : greenButtonStyle) + " text-xs font-bold"} disabled={'delivered' !== order.status} type="button">
                                Review
                            </button>
                        </div>
                    </div>
                )
            })}
            <span className="flex justify-end">
                <button className={blackButtonStyle + " text-xs font-bold"} onClick={console.log} type="button">
                    Archive
                </button>
            </span>
        </div>
    )
}

export default Order