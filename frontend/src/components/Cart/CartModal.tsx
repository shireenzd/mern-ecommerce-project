import React, { useEffect, useMemo, useState } from 'react'
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

  const [cartProducts, setCartProducts] = useState<any[]>([])

  const cartProductIds = useMemo(() => {
    return Object.keys(cart).filter((id) => cart[id] > 0)
  }, [cart])

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (!cartProductIds.length) {
        setCartProducts([])
        return
      }

      const response = await fetch(homeAPI + '/products/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          cart: cartProductIds
        })
      })
      const result = await response.json()
      if (Array.isArray(result)) {
        setCartProducts(result)
      } else {
        setCartProducts([])
      }
    }

    fetchCartProducts()
  }, [cart, token])

  const visibleProducts = cartProducts.filter((product) => cart[product._id] > 0)

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
      emptyCart()
      setShowCart(false)
      navigate('/my-orders')
    }
  }

  const getTotal = () => {
    let total = 0
    visibleProducts.forEach((product: any) => {
      const quantity = cart[product._id]
      if (product.price && quantity) {
        total += quantity * product.price
      }
    })
    return total.toString()
  }

  return (
    <DarkFullScreenWrapper>
      <span className="flex justify-between">
        <div>Cart</div>
        <p className="cursor-pointer" onClick={() => setShowCart(false)}>X</p>
      </span>
      <div className="flex flex-col gap-4 mt-6">
        {!visibleProducts.length && (
          <p className="text-base font-normal text-gray-300">Your cart is empty.</p>
        )}
        {visibleProducts.map((product) => (
          <CartItem
            key={product._id}
            product={product}
            quantity={cart[product._id]}
          />
        ))}
      </div>
      {visibleProducts.length > 0 && (
        <div className="flex justify-between mt-6">
          <span>Total: ${getTotal()}</span>
          <button className={greenButtonStyle} onClick={handleConfirmOrder} type="button">Confirm Order</button>
        </div>
      )}
    </DarkFullScreenWrapper>
  )
}

export default CartModal
