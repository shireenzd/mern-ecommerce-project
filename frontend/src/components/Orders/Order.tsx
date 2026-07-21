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

    const orderTotal = order.products.reduce((sum: number, product: any) => {
        return sum + ((product.price || 0) * (product.quantity || 0))
    }, 0)

    const totalItems = order.products.reduce((sum: number, product: any) => {
        return sum + (product.quantity || 0)
    }, 0)

    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <span className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Order placed on {getReadableDate(order.createdAt)}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        {totalItems} item{totalItems === 1 ? '' : 's'} • Total: ${orderTotal}
                    </p>
                </div>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium capitalize text-gray-700">
                    {order.status}
                </span>
            </span>
            {order.products.map((product: any) => {
                const reviewDisabled = 'delivered' !== order.status
                const lineTotal = (product.price || 0) * (product.quantity || 0)
                return (
                    <div key={product._id} className="flex flex-wrap items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-3">
                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-white">
                            <ProductCarousel pictures={product.pictures} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <h3 title={product.name} className="text-sm font-semibold text-gray-900">
                                        {product.name}
                                    </h3>
                                    <p className="mt-1 text-xs uppercase tracking-wide text-gray-400">
                                        Product ID: {product._id}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-900">${lineTotal}</p>
                                    <p className="text-xs text-gray-500">
                                        ${product.price} each
                                    </p>
                                </div>
                            </div>
                            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">
                                {product.description}
                            </p>
                        </div>
                        <div className="flex min-w-[7rem] flex-col items-center rounded-lg bg-white px-4 py-2">
                            <p className="text-xs uppercase tracking-wide text-gray-400">Quantity</p>
                            <p className="text-2xl font-semibold text-gray-900">{product.quantity}</p>
                        </div>
                        <div className="flex min-w-[10rem] flex-col items-end gap-2">
                            <button
                                onClick={() => { setProductBeingReviewed(product); setShowReviewModal(true) }}
                                className={(reviewDisabled ? grayButtonStyle : greenButtonStyle) + " text-xs font-bold"}
                                disabled={reviewDisabled}
                                type="button"
                            >
                                {reviewDisabled ? 'Review After Delivery' : 'Write Review'}
                            </button>
                            <p className="text-right text-xs text-gray-500">
                                {reviewDisabled ? 'Available when order is delivered.' : 'Share your feedback for this item.'}
                            </p>
                        </div>
                    </div>
                )
            })}
            <span className="flex justify-between gap-3 border-t border-gray-100 pt-2 text-sm text-gray-500">
                <p>Need to review something? Open a delivered item above.</p>
                <button className={blackButtonStyle + " text-xs font-bold"} onClick={console.log} type="button">
                    Archive
                </button>
            </span>
        </div>
    )
}

export default Order