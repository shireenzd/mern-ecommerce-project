import React, { useEffect, useState } from 'react'
import { useCommerceStore } from "../../store"
import CartItem from './CartItem'

function CartModal() {

  const {
    cart,
    setShowCart,
  } = useCommerceStore()


  return (
    <div className="w-full h-full absolute bg-[rgba(1,1,1,0.95)] z-10 p-6 text-white font-bold text-xl">
      <span className="flex justify-between">
        <div>Cart</div>
        <p className="cursor-pointer" onClick={() => setShowCart(false)}>X</p>
      </span>
      <div>
        {Object.entries(cart).map(([productId, number]) => {
          return <CartItem productId={productId} number={number} />
        })}
      </div>
    </div>
  )
}

export default CartModal