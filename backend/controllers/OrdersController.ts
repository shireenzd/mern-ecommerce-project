import express from 'express'
import Order from "../models/Order"
import { auth } from "../middleware/auth"

const OrdersController = express.Router()


OrdersController.post('/create', auth, async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.decoded.user._id
        const {
            cart
        } = req.body

        const order = new Order({
            products: cart,
            user: userId
        })

        const error = order.validateSync();
        if (error) {
            console.log(error)
            return res.status(400).json({ error: "Failed to validate review!" })
        }

        await order.save()
        res.json(order)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to create order!" })
    }
})


// TODO get orders for user
OrdersController.get('/my-orders', auth, async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.decoded.user._id
        const orders = Order.find({ user: userId }).exec()
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get orders!" })
    }
})

// TODO get order

// TODO get orders for my store

// TODO update status


export default OrdersController;