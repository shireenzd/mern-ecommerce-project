
import express from 'express'
import Store from "../models/Store"

const StoreController = express.Router()


StoreController.get('/:_id', async (req, res) => {
    try {
        if (!req.params._id) {
            return
        }
        const store = await Store.findOne({
            _id: req.params._id
        })
        res.json(store)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get store!" })
    }
})

StoreController.post('/create', async (req, res) => {
    try {
        // TODO
        // const ownerId = req.decoded.ownerId
        const {
            name,
            description,
            location,
            ownerId
        } = req.body
        const store = new Store(
            {
                name,
                description,
                location,
                ownerId
            }
        )
        await store.save()
        res.json(store)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get store!" })
    }
})


export default StoreController