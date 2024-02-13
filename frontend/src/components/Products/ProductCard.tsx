import React from 'react'
import { BsHeartFill } from 'react-icons/bs';
import { useCommerceStore } from "../../store";
import ProductCarousel from "./ProductCarousel";
import Rating from "../Shared/Rating";
import { homeAPI } from "../../shared/constants";

function ProductCard({ product }: { product: any }) {

    const {
        token,
        favorites,
        addOneToCart,
        setFavorites
    } = useCommerceStore()

    const getRating = (product: any) => {
        if (!product.numberOfReviews) {
            return false
        }
        return product.sumOfRatings / product.numberOfReviews
    }

    const handleLikeButton = async () => {
        const response = await fetch(homeAPI + '/products/like/' + product._id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
        if (200 === response.status) {
            const { user,
                product } = await response.json()
            setFavorites(user.favorites)
        }
    }
    return (
        <div className="flex flex-col w-44 h-[280px] overflow-clip rounded-xl shadow-md">
            <div className="top h-[60%] relative">
                <ProductCarousel pictures={product.pictures} />
                <div className="absolute top-2 left-2 leading-none text-sm">Store name</div>
                <span className="flex absolute bottom-2 justify-between w-full px-2 items-center">
                    <Rating currentRating={getRating(product) || 0} setCurrentRating={() => { }} numberOfReviews={product.numberOfReviews} />
                    <BsHeartFill onClick={handleLikeButton} className={"BsHeart-main " + (favorites.includes(product._id) && 'active')} />
                </span>
            </div>
            <div className="bottom px-2 py-2 h-[40%] flex flex-col justify-between">
                <span className="flex justify-between gap-4 items-center font-bold">
                    <h3 title={product.name} className="text-start text-xs truncate">{product.name}</h3>
                    <h3 className="text-end text-xs">${product.price}</h3>
                </span>
                <p className="text-xs mt-1 overflow-y-scroll">
                    {product.description}
                </p>
                <span className="flex justify-end">
                    {/* will do nothing if _id is undefined */}
                    <button onClick={() => addOneToCart(product._id)} type="button" className="text-xs font-bold px-2 py-1 bg-black rounded-md text-white">Add To Cart</button>
                </span>
            </div>
        </div>
    )
}

export default ProductCard