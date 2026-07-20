import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa6";

function Rating({ currentRating, setCurrentRating, numberOfReviews }: { currentRating: number, setCurrentRating: Function, numberOfReviews?: Number | undefined }) {
    const ratings = [1, 2, 3, 4, 5]
    const showNumberOfReviews = (numberOfReviews: any) => {
        if (!numberOfReviews) {
            return false
        }
        if (numberOfReviews > 0) {
            return true
        }
    }
    return (
        <span className="flex items-center">
            {ratings.map((rating) => <FaStar onClick={() => setCurrentRating(rating)} color={rating <= currentRating ? "orange" : "white"} key={rating} />)}
            {/* @ts-ignore */}
            {showNumberOfReviews(numberOfReviews) && <p>{numberOfReviews.toString()}</p>}
        </span>
    )
}

export default Rating