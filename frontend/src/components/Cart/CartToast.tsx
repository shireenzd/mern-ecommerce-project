import React, { useEffect } from 'react'
import { useCommerceStore } from '../../store'

function CartToast() {
    const { cartToast, clearCartToast } = useCommerceStore()

    useEffect(() => {
        if (!cartToast) return

        const timer = setTimeout(() => {
            clearCartToast()
        }, 3000)

        return () => clearTimeout(timer)
    }, [cartToast, clearCartToast])

    if (!cartToast) return null

    return (
        <div
            role="status"
            aria-live="polite"
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg"
        >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs font-bold">
                ✓
            </span>
            <span>{cartToast}</span>
            <button
                type="button"
                onClick={clearCartToast}
                className="ml-2 text-gray-400 transition hover:text-white"
                aria-label="Dismiss"
            >
                ×
            </button>
        </div>
    )
}

export default CartToast
