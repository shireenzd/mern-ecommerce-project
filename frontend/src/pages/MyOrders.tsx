import React, { useEffect, useState } from 'react'
import { useCommerceStore } from "../store"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { homeAPI } from "../shared/constants"
import Order from "../components/Orders/Order"

export default function MyOrders() {

    const navigate = useNavigate()
    const { token } = useCommerceStore()

    const [myOrders, setMyOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!token) {
            return navigate('/auth/login')
        }

        setLoading(true)
        setError('')
        axios.get(homeAPI + '/orders/my-orders',
            { headers: { 'Authorization': `Bearer ${token}` } })
            .then(function (response) {
                if (Array.isArray(response.data)) {
                    setMyOrders(response.data)
                }
            })
            .catch(function (error) {
                console.log(error);
                setError('Failed to load your orders')
            })
            .finally(() => {
                setLoading(false)
            });

    }, [navigate, token])

    const totalItems = myOrders.reduce((sum, order) => {
        return sum + order.products.reduce((innerSum: number, product: any) => innerSum + (product.quantity || 0), 0)
    }, 0)

    const handleArchived = (orderId: string) => {
        setMyOrders((currentOrders) => currentOrders.filter((order) => order._id !== orderId))
    }

    return (
        <div className="flex min-h-screen flex-col items-stretch gap-6 px-6 py-6 text-left">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900">My Orders</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Track your purchases and leave reviews after delivery.
                    </p>
                </div>
                {!loading && !error && myOrders.length > 0 && (
                    <p className="text-sm text-gray-500">
                        {myOrders.length} order{myOrders.length === 1 ? '' : 's'} • {totalItems} item{totalItems === 1 ? '' : 's'}
                    </p>
                )}
            </div>

            {loading && (
                <div className="rounded-xl border border-dashed border-gray-300 px-4 py-16 text-center text-sm text-gray-500">
                    Loading your orders...
                </div>
            )}

            {!loading && error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-700">
                    {error}
                </div>
            )}

            {!loading && !error && myOrders.length === 0 && (
                <div className="rounded-xl border border-dashed border-gray-300 px-4 py-16 text-center text-sm text-gray-500">
                    You have no orders yet.
                </div>
            )}

            {!loading && !error && myOrders.length > 0 && myOrders.map((order) => (
                <Order key={order._id} order={order} onArchived={handleArchived} />
            ))}
        </div>
    )
}
