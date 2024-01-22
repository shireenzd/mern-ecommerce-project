import express from "express";
import Product from '../models/Product'

const ProductsController = express.Router()

ProductsController.post('/create', async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category
        })

        product.save()

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
        res.status(400).json({ error: "Failed to update products!" })
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
        res.status(400).json({ error: "Failed to delete products!" })
    }
})

export default ProductsController;