import React, { useState } from 'react'
import { useCommerceStore } from "../../store"
import { defaultProduct, greenButtonStyle, homeAPI } from "../../shared/constants"

function AddProductForm({ product, setProduct }: { product: any, setProduct: Function }) {

    const {
        token
    } = useCommerceStore()

    const formStyle = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'space-between'
    }

    const handleSubmit = (e: any) => {
        let formData = new FormData()

        formData.append('name', product.name)
        formData.append('description', product.description)
        formData.append('price', product.price)
        formData.append('category', product.category)
        product.pictures.forEach((picture: any) => {
            formData.append('pictures', picture)
        })

        // localhost:5000/api/v1/products/create
        fetch(homeAPI + '/products/create', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                setProduct(defaultProduct)
            })
    }

    // TODO add placeholders to all inputs
    // TODO limit the category input to only what's available in the code 
    const inputRowStyle = "flex flex-col items-start"
    return (
        <form className="flex flex-col justify-center gap-2" style={formStyle}>
            <span className={inputRowStyle}>
                <label htmlFor="product-name">product-name</label>
                <input type="text" name="product-name" id="product-name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
            </span>
            <span className={inputRowStyle}>
                <label htmlFor="product-price">product-price</label>
                <input type="number" name="product-price" id="product-price" value={product.price} onChange={(e) => setProduct({ ...product, price: parseInt(e.target.value) })} />
            </span>
            <span className={inputRowStyle}>
                <label htmlFor="product-category">product-category</label>
                <input type="text" name="product-category" id="product-category" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} />
            </span>
            <span className={inputRowStyle}>
                <label htmlFor="product-description">product-description</label>
                <input type="text" name="product-description" id="product-description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
            </span>
            <span className={inputRowStyle}>
                <label htmlFor="product-pictures">Pictures</label>
                <input onChange={(e) => e.target.files && setProduct({ ...product, pictures: Array.from(e.target.files) })} type="file" name="product-pictures" id="product-pictures" multiple={true} />
            </span>
            <span className={inputRowStyle}>
                <button className={greenButtonStyle} onClick={handleSubmit} type="button">Add Product</button>
            </span>
        </form>
    )
}

export default AddProductForm