import React, { useState } from 'react'
import { useCommerceStore } from "../../store"
import { greenButtonStyle, homeAPI } from "../../shared/constants"
import DarkFullScreenWrapper from "../Shared/DarkFullScreenWrapper"
import Rating from "../Shared/Rating"

function Review() {

    const {
        token,
        setShowReviewModal,
        setProductBeingReviewed,
        productBeingReviewed,
    } = useCommerceStore()

    const [currentRating, setCurrentRating] = useState(4)
    const [comment, setComment] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const formStyle = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'space-between'
    }

    const handleSubmit = async () => {
        setError('')

        if (!comment.trim()) {
            setError('Please enter a review comment.')
            return
        }

        if (comment.trim().length < 20) {
            setError('Review comment must be at least 20 characters long.')
            return
        }

        try {
            setSubmitting(true)
            const response = await fetch(homeAPI + '/reviews/create', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: productBeingReviewed._id,
                    rating: currentRating,
                    comment: comment.trim()
                })
            })

            const data = await response.json()
            if (!response.ok || data?.error) {
                setError(data?.error || 'Failed to submit review.')
                return
            }

            setProductBeingReviewed({})
            setShowReviewModal(false)
        } catch (error) {
            console.log(error)
            setError('Failed to submit review.')
        } finally {
            setSubmitting(false)
        }
    }
    const closeReviewModal = () => {
        setProductBeingReviewed({})
        setShowReviewModal(false)
    }
    return (
        <DarkFullScreenWrapper>
            <div className="mx-auto flex max-w-xl flex-col gap-4 rounded-2xl bg-white p-6 text-left text-black shadow-xl">
                <span className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-lg font-semibold text-gray-900">Write a Review</p>
                        <p className="mt-1 text-sm text-gray-500">
                            Share your experience with {productBeingReviewed?.name || 'this product'}.
                        </p>
                    </div>
                    <button onClick={closeReviewModal} type="button" className="text-sm font-bold text-gray-500">X</button>
                </span>
                <form className="flex flex-col gap-2" style={formStyle}>
                    <Rating currentRating={currentRating} setCurrentRating={setCurrentRating} numberOfReviews={undefined} />
                    <span className="flex flex-col items-start gap-2">
                        <label htmlFor="user-comment">Enter a detailed review</label>
                        <textarea name="user-comment" id="user-comment" value={comment} onChange={(e) => { setComment(e.target.value) }} />
                        <p className="text-xs text-gray-500">Minimum 20 characters.</p>
                    </span>
                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <span className="flex justify-end">
                        <button className={greenButtonStyle} onClick={handleSubmit} type="button" disabled={submitting}>
                            {submitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </span>
                </form>
            </div>
        </DarkFullScreenWrapper>
    )
}

export default Review