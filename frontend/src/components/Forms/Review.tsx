import React, { useState } from 'react'
import { useCommerceStore } from "../../store"
import { homeURL } from "../../shared/constants"

function Review() {

    const {
        token
    } = useCommerceStore()

    const productId = '65ae50e32b41d6118aada2e0'
    const [rating, setRating] = useState(3)
    const [comment, setComment] = useState('')
    // {
    //     "productId": "65ae50e32b41d6118aada2e0",
    //     "comment":"wefwer wqergf ewrg erg ewrg ewr evrw werwerv wrevwergewrqgwqre eervrewrewg errevrever",
    //     "rating": 4

    // }

    const formStyle = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'space-between'
    }

    const handleSubmit = (e: any) => {
        // fetch example
        // localhost:5000/api/v1/reviews/create
        fetch(homeURL+'/reviews/create', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId,
                rating,
                comment
            })
        })
            .then((response) => { return response.json() })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <form style={formStyle}>
            <span>
                <label htmlFor="user-comment">user-comment</label>
                <input type="text" name="user-comment" id="user-comment" value={comment} onChange={(e) => { setComment(e.target.value) }} />
            </span>

            <button onClick={handleSubmit} type="button">Submit Review</button>
        </form>
    )
}

export default Review