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
    <div className="flex justify-between items-center gap-4 rounded-xl overflow-clip bg-gray-700 p-2">
      <div className="h-20 w-24 shrink-0">
        <ProductCarousel pictures={product.pictures} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1 text-left">
        <p className="truncate text-base font-semibold">{product.name}</p>
        <p className="line-clamp-2 text-sm font-normal text-gray-300">{product.description}</p>
        <p className="text-sm text-gray-300">${product.price} each</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => subtractOneFromCart(product._id)}
          >
            <CiSquareMinus className="cursor-pointer" size={32} />
          </button>
          <p className="min-w-[2rem] text-center text-2xl">{quantity}</p>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => addOneToCart(product._id, product.name)}
          >
            <CiSquarePlus className="cursor-pointer" size={32} />
          </button>
        </div>
        <p className="text-sm font-semibold">${lineTotal}</p>
      </div>
    </div>
  )
}

export default CartItem
