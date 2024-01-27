import express from "express";
import Product from '../models/Product'
import { auth } from "../middleware/auth";
import Store from "../models/Store";

const ProductsController = express.Router()

ProductsController.post('/create', auth, async (req, res) => {
    try {

        // @ts-ignore
        const userId = req.decoded.user._id

        const store = await Store.findOne({
            owner: userId
        })
        
        
        if (!store || !store.approved) {
            console.log(store)
            return res.status(400).json({error: "Your store is not approved yet!"})
        }

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            store: store._id
        })

        const error = product.validateSync();
        if (error) {
            console.log(error)
            return res.status(400).json({ error: "Failed to validate product!" })
        }

        await product.save()

        res.json(product)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to create product!" })
    }
})

ProductsController.get('/list', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get products!" })
    }
})

ProductsController.get('/:_id', async (req, res) => {
    try {
        if (!req.params._id) {
            return
        }
        const product = await Product.findOne({
            _id: req.params._id
        })
        res.json(product)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get product!" })
    }
})

// TODO authorize and only allow the seller to update the product
ProductsController.put('/:_id', async (req, res) => {
    try {
        if (!req.params._id || !req.body.name) {
            return
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params._id,
            { name: req.body.name },
            { new: true }
        );

        res.json(updatedProduct)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get products!" })
    }
})

ProductsController.delete('/delete/:_id', async (req, res) => {
    try {
        if (!req.params._id) {
            return
        }
        const operation = await Product.deleteOne({ _id: req.params._id });

        res.json(operation)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get products!" })
    }
})


// TODO add endpoint for store_owner to list the products they are selling

export default ProductsController;