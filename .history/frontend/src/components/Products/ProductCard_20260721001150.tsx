import React, { useState } from 'react'
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

    const [likeError, setLikeError] = useState('')

    const getRating = (product: any) => {
        if (!product.numberOfReviews) {
            return 0
        }
        return product.sumOfRatings / product.numberOfReviews
    }

    const storeName = typeof product.store === 'object' && product.store?.name
        ? product.store.name
        : 'Store'

    const isFavorite = favorites.includes(product._id)

    const handleLikeButton = async () => {
        setLikeError('')
        if (!token) {
            setLikeError('Log in to save favorites')
            return
        }

        try {
            const response = await fetch(homeAPI + '/products/like/' + product._id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })
            const data = await response.json()
            if (response.status !== 200 || data?.error) {
                setLikeError(data?.error || 'Could not update favorite')
                return
            }
            setFavorites(data.user.favorites)
        } catch {
            setLikeError('Could not update favorite')
        }
    }

    return (
        <div className="flex w-44 flex-col overflow-hidden rounded-xl border border-gray-100 bg-white text-left shadow-sm transition hover:shadow-md">
            <div className="relative h-40 bg-gray-100">
                <ProductCarousel pictures={product.pictures || []} />
                <div className="absolute left-2 top-2 max-w-[70%] truncate rounded bg-white/90 px-2 py-0.5 text-[10px] font-medium text-gray-700">
                    {storeName}
                </div>
                <span className="absolute bottom-2 flex w-full items-center justify-between px-2">
                    <Rating
                        currentRating={getRating(product)}
                        setCurrentRating={() => { }}
                        numberOfReviews={product.numberOfReviews}
                    />
                    <button
                        type="button"
                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        onClick={handleLikeButton}
                        className="rounded-full bg-white/90 p-1.5 leading-none shadow-sm"
                    >
                        <BsHeartFill className={"BsHeart-main " + (isFavorite ? 'active' : 'text-gray-300')} />
                    </button>
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
                    {likeError && (
                        <p className="mt-1 text-[10px] text-red-500">{likeError}</p>
                    )}
                </div>
                <span className="flex justify-end">
                    <button
                        onClick={() => addOneToCart(product._id)}
                        type="button"
                        className="rounded-md bg-black px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-800"
                    >
                        Add To Cart
                    </button>
                </span>
            </div>
        </div>
    )
}

export default ProductCard
