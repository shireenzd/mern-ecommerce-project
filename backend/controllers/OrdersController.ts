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
        res.status(400).json({error: "Failed to create order!" })
    }
})


// TODO get order

// TODO get orders for my store

// TODO update status


export default OrdersController;