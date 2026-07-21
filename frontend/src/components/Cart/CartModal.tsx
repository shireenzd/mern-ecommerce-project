import React, { useEffect, useMemo, useState } from 'react'
import { useCommerceStore } from "../../store"
import CartItem from "./CartItem"
import { greenButtonStyle, homeAPI } from "../../shared/constants"
import { useNavigate } from "react-router-dom"

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
  }, [cartProductIds, token])

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
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-gray-50 text-left text-gray-900">
      <div className="flex items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 py-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Cart</h2>
          <p className="mt-1 text-sm font-normal text-gray-500">
            Review your items before placing the order.
          </p>
        </div>
        <button
          className="rounded-full border border-gray-200 px-3 py-1 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          onClick={() => setShowCart(false)}
          type="button"
        >
          Close
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
          {!visibleProducts.length && (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white px-4 py-16 text-center text-base font-normal text-gray-500">
              Your cart is empty.
            </div>
          )}
          {visibleProducts.map((product) => (
            <CartItem
              key={product._id}
              product={product}
              quantity={cart[product._id]}
            />
          ))}
        </div>
      </div>

      {visibleProducts.length > 0 && (
        <div className="border-t border-gray-200 bg-white px-6 py-4">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
            <span className="text-lg font-semibold text-gray-900">Total: ${getTotal()}</span>
            <button className={greenButtonStyle} onClick={handleConfirmOrder} type="button">
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartModal
