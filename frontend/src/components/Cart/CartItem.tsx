import React from 'react'
import { useCommerceStore } from "../../store"
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import ProductCarousel from "../Products/ProductCarousel";

function CartItem({ product, number }: { product: any, number: number }) {

  const {
    cart,
    addOneToCart,
    subtractOneFromCart
  } = useCommerceStore()

  console.log(product)

  const logCart = () => {
    console.log(cart)
  }

  return (
    <div className="flex justify-between items-center rounded-xl overflow-clip bg-gray-700">
      <div className="w-[25%]">
        <ProductCarousel pictures={product.pictures} />
      </div>
      <div className="w-[50%]">
        some description {product._id}
      </div>
      <div className="w-[220px] px-10 flex items-center justify-between">
        <CiSquareMinus className="cursor-pointer" onClick={() => subtractOneFromCart(product._id)} size={40} />
        <p className="text-2xl">{number}</p>
        <CiSquarePlus className="cursor-pointer" onClick={() => { addOneToCart(product._id); logCart() }} size={40} />
      </div>
    </div>
  )
}

export default CartItem