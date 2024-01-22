import express from "express";
import Product from '../models/Product'
import Review from "../models/Review";

const ReviewController = express.Router()

ReviewController.post('/create', async (req, res) => {
    try {
        const review = new Review({
            name: req.body.name,
            comment: req.body.comment
        })

        review.save()

        res.json(review)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to create review!" })
    }
})

ReviewController.get('/list', async (req, res) => {
    try {
        const reviews = await Review.find()
        res.json(reviews)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get reviews!" })
    }
})

ReviewController.get('/:_id', async (req, res) => {
    try {
        if (!req.params._id) {
            return
        }
        const review = await Review.findOne({
            _id: req.params._id
        })
        res.json(review)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get review!" })
    }
})

ReviewController.put('/:_id', async (req, res) => {
    try {
        if (!req.params._id || !req.body.comment) {
            return
        }

        const updatedReview = await Review.findByIdAndUpdate(
            req.params._id,
            { comment: req.body.comment },
            { new: true }
        );

        res.json(updatedReview)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to update review!" })
    }
})

ReviewController.delete('/delete/:_id', async (req, res) => {
    try {
        if (!req.params._id) {
            return
        }
        const operation = await Review.deleteOne({ _id: req.params._id });

        res.json(operation)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to delete Review!" })
    }
})

export default ReviewController;