import express from "express";
import Product from '../models/Product'
import { auth } from "../middleware/auth";
import Store from "../models/Store";
import { productUploads } from "../middleware/multer";
import User from "../models/User";
import { productCategories } from "../shared/constants";

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

        if (!(productCategories as readonly string[]).includes(req.body.category)) {
            return res.status(400).json({ error: "Invalid category. Choose one of the allowed categories." })
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
            const searchText = String(searchFilter).trim()
            const escaped = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            filters = {
                ...filters,
                $or: [
                    { name: { $regex: escaped, $options: 'i' } },
                    { description: { $regex: escaped, $options: 'i' } },
                ]
            }
        }
        // @ts-ignore
        const products = await Product.find(filters)
            .populate('store', 'name')
            // @ts-ignore
            .sort({ price: productSorting })
            .exec()

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

ProductsController.get('/mine/all', auth, async (req, res) => {
    try {
        // @ts-ignore
        const storeId = req.decoded.user.store
        if (!storeId) {
            return res.status(400).json({ error: "You don't have a store" })
        }

        const store = await Store.findById(storeId)
        if (!store) {
            return res.status(404).json({ error: "Store not found" })
        }

        const products = await Product.find({
            store: store._id
        }).populate('store', 'name logo description location')

        res.json({ store: store.toJSON(), products })
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

// authorize and only allow the seller to update the product
ProductsController.put('/:_id', auth, async (req, res) => {
    try {
        // @ts-ignore
        const user = req.decoded.user
        if (!user.store) {
            return res.status(403).json({ error: "You are not authorized!" })
        }

        if (!req.params._id) {
            return res.status(400).json({ error: "Product id is required" })
        }

        const { name, description, price, category } = req.body

        if (category && !(productCategories as readonly string[]).includes(category)) {
            return res.status(400).json({ error: "Invalid category. Choose one of the allowed categories." })
        }

        const updates: Record<string, unknown> = {}
        if (name) updates.name = name
        if (description) updates.description = description
        if (price !== undefined) updates.price = price
        if (category) updates.category = category

        if (!Object.keys(updates).length) {
            return res.status(400).json({ error: "No valid fields to update" })
        }

        const updatedProduct = await Product.findOneAndUpdate(
            { _id: req.params._id, store: user.store },
            updates,
            { new: true }
        )

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" })
        }

        res.json(updatedProduct)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to update product!" })
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

        if (!operation.deletedCount) {
            return res.status(404).json({ error: "Product not found" })
        }

        res.json(operation)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get products!" })
    }
})


export default ProductsController;