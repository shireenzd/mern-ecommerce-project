import React, { useState } from 'react'
import ProductCarousel from "../Products/ProductCarousel"
import { blackButtonStyle, grayButtonStyle, greenButtonStyle, homeAPI, productCategories, redButtonStyle } from "../../shared/constants"
import { useCommerceStore } from "../../store"

function StoreProduct({
    product,
    storeName,
    onDeleted,
    onUpdated,
}: {
    product: any,
    storeName?: string,
    onDeleted: (productId: string) => void,
    onUpdated: (product: any) => void,
}) {
    const {
        token,
        setOnConfirm,
        setConfirmModalMessage,
        setShowConfirmModal,
    } = useCommerceStore()

    const [editing, setEditing] = useState(false)
    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)
    const [form, setForm] = useState({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
    })

    const displayStoreName = storeName
        || (typeof product.store === 'object' && product.store?.name)
        || 'My Store'

    const deleteProduct = async () => {
        const response = await fetch(homeAPI + '/products/delete/' + product._id, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await response.json()
        if (!response.ok || data?.error) {
            setError(data?.error || 'Failed to remove product')
            return
        }

        onDeleted(product._id)
        setShowConfirmModal(false)
    }

    const openDeleteConfirm = () => {
        setError('')
        setConfirmModalMessage(`Remove "${product.name}" from your store?`)
        setOnConfirm(deleteProduct)
        setShowConfirmModal(true)
    }

    const saveEdit = async () => {
        setError('')
        setSaving(true)

        try {
            const response = await fetch(homeAPI + '/products/' + product._id, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: form.name,
                    description: form.description,
                    price: Number(form.price),
                    category: form.category,
                }),
            })

            const data = await response.json()
            if (!response.ok || data?.error) {
                setError(data?.error || 'Failed to update product')
                return
            }

            onUpdated(data)
            setEditing(false)
        } catch {
            setError('Failed to update product')
        } finally {
            setSaving(false)
        }
    }

    if (editing) {
        return (
            <div className="flex w-full max-w-[11.5rem] flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 text-left shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900">Edit product</h3>
                <input
                    className="w-full rounded-[10px] border border-gray-500 px-2 py-1 text-xs"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Name"
                />
                <input
                    type="number"
                    className="w-full rounded-[10px] border border-gray-500 px-2 py-1 text-xs"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    placeholder="Price"
                />
                <select
                    className="w-full rounded-[10px] border border-gray-500 px-2 py-1 text-xs"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                    {productCategories.map((category) => (
                        <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                </select>
                <textarea
                    className="w-full rounded-[10px] border border-gray-500 px-2 py-1 text-xs"
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Description"
                />
                {error && <p className="text-[10px] text-red-600">{error}</p>}
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        className={grayButtonStyle + " text-xs font-bold"}
                        onClick={() => {
                            setEditing(false)
                            setError('')
                            setForm({
                                name: product.name,
                                description: product.description,
                                price: product.price,
                                category: product.category,
                            })
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className={greenButtonStyle + " text-xs font-bold"}
                        onClick={saveEdit}
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex w-full max-w-[11.5rem] flex-col overflow-hidden rounded-xl border border-gray-100 bg-white text-left shadow-sm">
            <div className="relative h-40 bg-gray-100">
                <ProductCarousel pictures={product.pictures || []} />
                <div className="absolute left-2 top-2 max-w-[70%] truncate rounded bg-white/90 px-2 py-0.5 text-[10px] font-medium text-gray-700">
                    {displayStoreName}
                </div>
                <span className="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-0.5 text-[10px] font-medium capitalize text-gray-600">
                    {product.category}
                </span>
            </div>
            <div className="flex h-[8.5rem] flex-col justify-between px-3 py-2.5">
                <div>
                    <span className="flex items-start justify-between gap-2">
                        <h3 title={product.name} className="truncate text-left text-sm font-semibold text-gray-900">
                            {product.name}
                        </h3>
                        <h3 className="shrink-0 text-sm font-semibold text-gray-900">${product.price}</h3>
                    </span>
                    <p className="mt-1 line-clamp-2 text-left text-xs leading-relaxed text-gray-500">
                        {product.description}
                    </p>
                    {error && <p className="mt-1 text-[10px] text-red-500">{error}</p>}
                </div>
                <span className="flex justify-end gap-2">
                    <button
                        onClick={openDeleteConfirm}
                        type="button"
                        className={redButtonStyle + " text-xs font-bold"}
                    >
                        Remove
                    </button>
                    <button
                        onClick={() => setEditing(true)}
                        type="button"
                        className={blackButtonStyle + " text-xs font-bold"}
                    >
                        Edit
                    </button>
                </span>
            </div>
        </div>
    )
}

export default StoreProduct
