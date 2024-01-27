import React from 'react'
import { useCommerceStore } from "../../store"

function PlaceOrder() {

    const {
        cart,
        addOneToCart,
        removeOneFromCart
    } = useCommerceStore()
    return (
        <>
            {Object.entries(cart).map(
                ([key, value]: [string, any], i) => (
                    <span key={key}>
                        {key} : {value}
                    </span>
                )
            )}
        </>
    )
}

export default PlaceOrder