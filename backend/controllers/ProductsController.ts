import express from "express";
import Product from '../models/Product'
import { auth } from "../middleware/auth";
import Store from "../models/Store";
import { productUploads } from "../middleware/multer";
import User from "../models/User";

const ProductsController = express.Router()

ProductsController.post('/create', auth, productUploads.array('pictures', 10), async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.decoded.user._id

        const store = await Store.findOne({
            owner: userId
        })


        if (!store || !store.approved) {
            console.log(store)
            return res.status(400).json({ error: "Your store is not approved yet!" })
        }

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            // @ts-ignore
            store: store._id,
            // @ts-ignore
            pictures: req.files?.map((file) => {
                return "/product-images/" + file.filename
            })
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

ProductsController.get('/filter', async (req, res) => {
    try {
        // @ts-ignore
        const { searchFilter, categoryFilter, productSorting } = req.query
        console.log(searchFilter, categoryFilter, productSorting)

        let filters = {}
        if (categoryFilter) {
            filters = {
                ...filters,
                category: categoryFilter
            }
        }
        if (searchFilter) {
            filters = {
                ...filters,
                $text: { $search: searchFilter }
            }
        }
        // @ts-ignore
        const products = await Product.find(filters).sort({ price: productSorting }).exec()

        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get products!" })
    }
})
ProductsController.get('/all', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get products!" })
    }
})

ProductsController.post('/cart', auth, async (req, res) => {
    try {
        console.log(req.body)
        const {
            cart
        } = req.body

        if (!cart.length) {
            return res.json({ error: "happened here" })
        }
        console.log(cart)

        const products = await Product.find({
            _id: { "$in": cart }
        }).exec()

        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get products for cart!" })
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

ProductsController.post('/like/:_id', auth, async (req, res) => {
    try {
        const productId = req.params._id
        if (!productId) {
            return res.status(400).json({ error: "Product ID missing!" })
        }
        // @ts-ignore
        const userId = req.decoded.user._id
        const user = await User.find({
            _id: userId
        })

        const product = await Product.find({
            _id: productId
        })

        // @ts-ignore
        const alreadyLiked = (user.favorites || []).find((id: string) => productId === id)
        let newFavorites;
        let newLikes;
        if (alreadyLiked) {
            // @ts-ignore
            newLikes = (product.likes||0) - 1
            // @ts-ignore
            newFavorites = (user.favorites || []).filter((id: string) => productId !== id)
        } else {
            // @ts-ignore
            newLikes = (product.likes|| 0) + 1
            // @ts-ignore
            newFavorites = [...(user.favorites || []), productId]
        }

        const updatedProduct = await Product.findByIdAndUpdate({ _id: productId }, { likes: newLikes }, { new: true })
        const updatedUser = await User.findByIdAndUpdate({
            _id: userId
        }, {
            favorites: newFavorites
        }, { new: true })

        res.json({
            user: updatedUser,
            product: updatedProduct
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to update like!" })
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

ProductsController.delete('/delete/:_id', auth, async (req, res) => {
    try {
        // @ts-ignore
        const user = req.decoded.user
        if (!user.store) {
            return res.status(403).json({ error: "You are not authorized!" })
        }

        if (!req.params._id) {
            return
        }
        const operation = await Product.deleteOne({
            _id: req.params._id,
            store: user.store
        });

        res.json(operation)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get products!" })
    }
})


// TODO add endpoint for store_owner to list the products they are selling
ProductsController.get("/mine/all", auth, async (req, res) => {
    try {
        // @ts-ignore
        const storeId = req.decoded.user.store
        if (!storeId) {
            return res.status(400).json({ error: "You don't have a store" })
        }

        const products = await Product.find({
            store: storeId
        })

        res.json(products)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get products!" })
    }
})


export default ProductsController;