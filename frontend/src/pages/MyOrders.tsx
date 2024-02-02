import React, { useEffect, useState } from 'react'
import { useCommerceStore } from "../store"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { homeURL } from "../shared/constants"
import ProductCard from "../components/ProductCard"

export default function MyOrders() {

    const navigate = useNavigate()
    const { token } = useCommerceStore()

    const [myOrders, setMyOrders] = useState<any[]>([])

    useEffect(() => {
        if (!token) {
            return navigate('/auth/login')
        }
        // localhost:5000/api/v1/users/register
        axios.get(homeURL + '/orders/my-orders',
            { headers: { 'Authorization': `Bearer ${token}` } })
            .then(function (response) {
                console.log(response);
                if(Array.isArray(response.data)){
                    setMyOrders(response.data)
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])
    return (
        <>
            <h1>MyOrders</h1>
            {myOrders.map((order) => (
                <ProductCard product={order} />
            ))}
        </>
    )
}
