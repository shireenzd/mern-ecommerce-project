import React, { useState } from 'react'
import { useCommerceStore } from "../../store"
import { defaultProduct, greenButtonStyle, homeAPI, productCategories } from "../../shared/constants"

function AddProductForm({ product, setProduct }: { product: any, setProduct: Function }) {

    const {
        token
    } = useCommerceStore()

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const formStyle = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'space-between'
    }

    const handleSubmit = async () => {
        setError('')
        setSuccess('')

        if (!product.category) {
            setError('Please choose a category')
            return
        }

        if (!productCategories.includes(product.category)) {
            setError('Please choose a valid category')
            return
        }

        let formData = new FormData()

        formData.append('name', product.name)
        formData.append('description', product.description)
        formData.append('price', product.price)
        formData.append('category', product.category)
        product.pictures.forEach((picture: any) => {
            formData.append('pictures', picture)
        })

        try {
            const response = await fetch(homeAPI + '/products/create', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            })
            const data = await response.json()
            if (!response.ok || data?.error) {
                setError(data?.error || 'Failed to create product')
                return
            }
            setProduct(defaultProduct)
            setSuccess('Product added')
        } catch {
            setError('Failed to create product')
        }
    }

    const inputRowStyle = "flex flex-col items-start w-full"
    return (
        <form className="flex flex-col justify-center gap-2" style={formStyle}>
            <span className={inputRowStyle}>
                <label htmlFor="product-name">Product name</label>
                <input type="text" name="product-name" id="product-name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
            </span>
            <span className={inputRowStyle}>
                <label htmlFor="product-price">Price</label>
                <input type="number" name="product-price" id="product-price" value={product.price} onChange={(e) => setProduct({ ...product, price: parseInt(e.target.value) })} />
            </span>
            <span className={inputRowStyle}>
                <label htmlFor="product-category">Category</label>
                <select
                    name="product-category"
                    id="product-category"
                    value={product.category}
                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                    className="w-full rounded-[10px] border border-gray-500 px-2 py-1 text-xs"
                >
                    <option value="" disabled>
                        Select a category
                    </option>
                    {productCategories.map((category) => (
                        <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                </select>
            </span>
            <span className={inputRowStyle}>
                <label htmlFor="product-description">Description</label>
                <input type="text" name="product-description" id="product-description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
            </span>
            <span className={inputRowStyle}>
                <label htmlFor="product-pictures">Pictures</label>
                <input onChange={(e) => e.target.files && setProduct({ ...product, pictures: Array.from(e.target.files) })} type="file" name="product-pictures" id="product-pictures" multiple={true} />
            </span>
            {error && <p className="text-left text-xs text-red-600">{error}</p>}
            {success && <p className="text-left text-xs text-green-700">{success}</p>}
            <span className={inputRowStyle}>
                <button className={greenButtonStyle} onClick={handleSubmit} type="button">Add Product</button>
            </span>
        </form>
    )
}

export default AddProductForm
