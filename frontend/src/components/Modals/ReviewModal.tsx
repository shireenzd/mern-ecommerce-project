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

    const formStyle = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'space-between'
    }

    const handleSubmit = (e: any) => {
        // fetch example
        // localhost:5000/api/v1/reviews/create
        fetch(homeAPI + '/reviews/create', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: productBeingReviewed._id,
                rating: currentRating,
                comment
            })
        })
            .then((response) => {
                if (200 === response.status) {
                    console.log(response)
                    setProductBeingReviewed({})
                    setShowReviewModal(false)
                    return response.json()
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const closeReviewModal = () => {
        setProductBeingReviewed({})
        setShowReviewModal(false)
    }
    return (
        <DarkFullScreenWrapper>
            <div className="flex flex-col gap-4">
                <span>
                    <p>Review</p>
                    <button onClick={closeReviewModal} type="button">X</button>
                </span>
                <form className="flex flex-col gap-2" style={formStyle}>
                    <Rating currentRating={currentRating} setCurrentRating={setCurrentRating} numberOfReviews={undefined} />
                    <span className="flex flex-col items-start gap-2">
                        <label htmlFor="user-comment">Enter a detailed review!</label>
                        <textarea name="user-comment" id="user-comment" value={comment} onChange={(e) => { setComment(e.target.value) }} />
                    </span>

                    <span className="flex justify-end">
                        <button className={greenButtonStyle} onClick={handleSubmit} type="button">Submit Review</button>
                    </span>
                </form>
            </div>
        </DarkFullScreenWrapper>
    )
}

export default Review