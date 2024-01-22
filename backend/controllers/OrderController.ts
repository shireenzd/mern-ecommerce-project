import express from "express";
import Order from "../models/Order";

const OrderController = express.Router()

OrderController.post('/create', async (req, res) => {
    try {
        const order = new Order({
            quantity: req.body.quantity
        })

        order.save()

        res.json(order)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to create order!" })
    }
})

OrderController.get('/list', async (req, res) => {
    try {
        const orders = await Order.find()
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get orders!" })
    }
})

OrderController.get('/:_id', async (req, res) => {
    try {
        if (!req.params._id) {
            return
        }
        const order = await Order.findOne({
            _id: req.params._id
        })
        res.json(order)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get order!" })
    }
})

OrderController.put('/:_id', async (req, res) => {
    try {
        if (!req.params._id || !req.body.quantity) {
            return
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params._id,
            { quantity: req.body.quantity },
            { new: true }
        );

        res.json(updatedOrder)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to update order!" })
    }
})

OrderController.delete('/delete/:_id', async (req, res) => {
    try {
        if (!req.params._id) {
            return
        }
        const operation = await Order.deleteOne({ _id: req.params._id });

        res.json(operation)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to delete order!" })
    }
})


export default OrderController