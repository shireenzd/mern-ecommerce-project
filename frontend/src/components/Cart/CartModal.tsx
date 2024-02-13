import React, { useEffect, useState } from 'react'
import { useCommerceStore } from "../../store"
import CartItem from "./CartItem"
import { greenButtonStyle, homeAPI } from "../../shared/constants"
import { useNavigate } from "react-router-dom"
import DarkFullScreenWrapper from "../Shared/DarkFullScreenWrapper"

function CartModal() {

  const navigate = useNavigate()

  const {
    token,
    cart,
    emptyCart,
    setShowCart,
  } = useCommerceStore()

  const [cartProducts, setCartProducts] = useState([])
  useEffect(() => {

    const fetchCartProducts = async () => {
      const response = await fetch(homeAPI + '/products/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          cart: Object.keys(cart)
        })
      })
      const result = await response.json()
      console.log(result)
      setCartProducts(result)
    }

    fetchCartProducts();
  }, [])

  const handleConfirmOrder = async () => {
    const response = await fetch(homeAPI + '/orders/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        cart: cart
      })
    })
    if (200 === response.status) {
      const result = await response.json()
      // empty cart
      emptyCart()
      // hide cart MOdal
      setShowCart(false)
      // navigate to my orders page
      navigate('/my-orders')
    }
  }

  const getTotal = () => {
    let total = 0;
    if (!cartProducts.length) {
      return '0'
    }
    cartProducts.forEach((product: any) => {
      let price = product.price
      // @ts-ignore
      let quantity = cart[product._id]

      if (!price || !quantity) {
        // jump over this element
        return;
      }

      total = total + (quantity * price)

    })
    console.log(total)
    return total.toString()
  }

  return (
    <DarkFullScreenWrapper>
      <span className="flex justify-between">
        <div>Cart</div>
        <p className="cursor-pointer" onClick={() => setShowCart(false)}>X</p>
      </span>
      <div className="flex flex-col gap-4 mt-6">
        {cartProducts.length && cartProducts.map((product) => {
          // @ts-ignore
          return <CartItem key={product._id} product={product} number={cart[product._id]} />
        })}
      </div>
      <div className="flex justify-between mt-6">
        Total: ${getTotal()}
        <button className={greenButtonStyle} onClick={handleConfirmOrder} type="button">Confirm Order</button>
      </div>
    </DarkFullScreenWrapper>
  )
}

export default CartModal