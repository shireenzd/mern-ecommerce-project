import React from 'react'
import { useCommerceStore } from "../../store"
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import ProductCarousel from "../Products/ProductCarousel";

function CartItem({ product, quantity }: { product: any, quantity: number }) {
  const {
    addOneToCart,
    subtractOneFromCart
  } = useCommerceStore()

  const lineTotal = product.price * quantity

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50 p-3">
      <div className="h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-white">
        <ProductCarousel pictures={product.pictures} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1 text-left text-gray-900">
        <p className="truncate text-base font-semibold">{product.name}</p>
        <p className="line-clamp-2 text-sm font-normal text-gray-500">{product.description}</p>
        <p className="text-sm text-gray-500">${product.price} each</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2 text-gray-900">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => subtractOneFromCart(product._id)}
            className="rounded-md border border-gray-200 bg-white p-1 transition hover:bg-gray-100"
          >
            <CiSquareMinus className="cursor-pointer" size={28} />
          </button>
          <p className="min-w-[2rem] text-center text-2xl font-semibold">{quantity}</p>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => addOneToCart(product._id, product.name)}
            className="rounded-md border border-gray-200 bg-white p-1 transition hover:bg-gray-100"
          >
            <CiSquarePlus className="cursor-pointer" size={28} />
          </button>
        </div>
        <p className="text-sm font-semibold">${lineTotal}</p>
      </div>
    </div>
  )
}

export default CartItem
