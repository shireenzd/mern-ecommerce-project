import React, { useState } from 'react'
import { useCommerceStore } from "../../store"
import { defaultProduct, homeAPI } from "../../shared/constants"

function AddProductForm({ product, setProduct }: { product: any, setProduct: Function }) {

    const {
        token
    } = useCommerceStore()

    const formStyle = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'space-between',
        backgroundColor: '#e5e5e5',
        opacity: '70%',
        padding: '20px',
        boxShadow: ' 4px 4px 4px 4px #c5c5c5',
        // boxShadow: '3px 3px 5px #c5c5c5 ,  -3px -3px 5px #c5c5c5'

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
    const inputRowStyle = "flex flex-col items-start"
    return (
        <form className="flex flex-col justify-center gap-2 rounded-xl" style={formStyle}>
            <span className={inputRowStyle}>
                <label className='font-medium' htmlFor="product-name">product-name</label>
                <input className='addProductinput' type="text" name="product-name" id="product-name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
            </span>
            <span className={inputRowStyle}>
                <label className='font-medium' htmlFor="product-price">product-price</label>
                <input className='addProductinput' type="number" name="product-price" id="product-price" value={product.price} onChange={(e) => setProduct({ ...product, price: parseInt(e.target.value) })} />
            </span>
            <span className={inputRowStyle}>
                <label className='font-medium' htmlFor="product-category">product-category</label>
                <select id="Category" onChange={(e) => setProduct({ ...product, category: e.target.value })} className='addProductinput border-[1px] border-gray-700 rounded-md w-full font-medium'>
                    <option value=''>Category</option>
                    <option value='furniture'>furniture</option>
                    <option value='arts'>arts</option>
                    <option value='vases'>vases</option>
                    <option value='clothes'>clothes</option>
                    <option value='paintings'>paintings</option>
                </select>
            </span>
            <span className={inputRowStyle}>
                <label className='font-medium' htmlFor="product-description">product-description</label>
                <input type="text" className='addProductinput' name="product-description" id="product-description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
            </span>
            <span className={inputRowStyle}>
                <label className='font-medium' htmlFor="product-pictures">Pictures</label>
                <input className='addProductinput file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium flex h-10 w-full rounded-md border border-input bg-white text-sm text-gray-400'
                    onChange={(e) => e.target.files && setProduct({ ...product, pictures: Array.from(e.target.files) })} type="file" name="product-pictures" id="product-pictures" multiple={true} />
            </span>
            <span className={inputRowStyle}>
                <button className='classButton ' onClick={handleSubmit} type="button">Add Product</button>
            </span>
        </form>
    )
}

export default AddProductForm