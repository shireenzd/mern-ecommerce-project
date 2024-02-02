import React from 'react'
import { useCommerceStore } from '../../store'
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci'

function CartItem({ productId, number }: { productId: string, number: number }) {

    const {addOneToCart, subtractOneFromCart } = useCommerceStore()


    return (
        <div className='flex justify-between items-center rounded-md overflow-clip bg-gray-700'>
            <div className='w-[25%]'>
                <img src="/pexels-photo-90946.webp" alt="picture" />
            </div>
            <div className='w-[50%]'>
                some description {productId}
            </div>
            <div className='w-[220px] px-10 flex items-center justify-between'>
            <CiSquareMinus onClick={()=>{subtractOneFromCart(productId)}} size={40}/>
            <p className='text-2xl'>{number}</p>
            <CiSquarePlus onClick={()=>{addOneToCart(productId)}} size={40}/>
            </div>
        </div>
    )
}

export default CartItem