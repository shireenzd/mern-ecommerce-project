import express from 'express'
import Order from "../models/Order"
import { auth } from "../middleware/auth"
import Product from "../models/Product"

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
        const orders = await Order.find({
            user: userId
        })
            .exec()
        // TODO this is not making use of MongoDB relations, instead it's doing the processing here in the JS thread, so it can be refactored later to use the model relations
        let populatedOrders: any = [];
        for await (const order of orders) {
            const productQuantities = order.products
            let products = await Product.find({
                _id: { "$in": Object.keys(productQuantities) }
            }).exec()
            // @ts-ignore
            products = products.map((product) => {
                return { ...product.toJSON(), quantity: productQuantities[product.id] }
            })
            populatedOrders.push({...order.toJSON(), products: products})
        }
        res.json(populatedOrders)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get orders!" })
    }
})

// TODO get order

// TODO get orders for my store

// TODO update status


export default OrdersController;