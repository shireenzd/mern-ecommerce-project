import React, { useEffect, useState } from 'react'
import { useCommerceStore } from "../../store"
import CartItem from './CartItem'
import { homeURL } from '../../shared/constants'

function CartModal() {

  const {
    cart,
    setShowCart,
    token
  } = useCommerceStore()

  const [cartProducts, setCartProducts] = useState([])

  // useEffect(() => {
  //   const fetchCartProducts = async () => {
  //     const response = await fetch(homeURL + '/products/cart', {
  //       method: 'POST',
  //       headers: {
  //         'contentType' : 'application/json',
  //         'Authorization': `Bearer ${token}`},
  //       body: JSON.stringify({
  //         cart: Object.keys(cart)
  //       })
  //     })
  //     const result = await response.json();
  //     setCartProducts(result)
  //   }
  //   fetchCartProducts()
  // })

  //  const handleConfirmOrder=(){

  //  }

  //  const getTotal = (){
  //   // TODO
  //  }

  return (
    <div className="w-full h-full absolute bg-[rgba(1,1,1,0.95)] z-10 p-6 text-white font-bold text-xl">
      <span className="flex justify-between">
        <div>Cart</div>
        <p className="cursor-pointer" onClick={() => setShowCart(false)}>X</p>
      </span>
      <div className='flex flex-col gap-4 pt-6'>
        {Object.entries(cart).map(([productId, number]: [string, any]) => {
          return <CartItem productId={productId} number={number} />
        })}
      </div>
      <span>
        {/* Total: {getTotal} */}
      </span>
      <button type='button'>confirm order</button>
    </div>
  )
}

export default CartModal