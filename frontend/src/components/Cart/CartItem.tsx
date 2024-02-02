import React from 'react'
import { useCommerceStore } from '../../store'

function CartItem({ productId, number }: { productId: any, number: any }) {

    const { removeOneFromCart } = useCommerceStore()

    return (
        <div>
            
        </div>
    )
}

export default CartItem