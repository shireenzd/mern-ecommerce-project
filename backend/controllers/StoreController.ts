import express from 'express'
import Store from "../models/Store"
import User from "../models/User"
import { auth } from "../middleware/auth"
import { superAdmins } from "../shared/constants"

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

StoreController.post('/create', auth, async (req, res) => {
    try {
        // @ts-ignore
        const ownerId = req?.decoded.user._id
        if(!ownerId){
            res.status(400).json({error: "Token missing ownerId!"})
        }
        
        const {
            name,
            description,
            location,
        } = req.body

        const owner = await User.findById(ownerId)

        if (!owner) {
            throw new Error("Invalid user")
        }

        if (owner?.toJSON().store) {
            return res.status(400).json({ error: "User already owns a store!" })
        }

        const store = new Store(
            {
                name,
                description,
                location,
                owner: ownerId
            }
        )

        const error = store.validateSync();
        if (error) {
            console.log(error)
            return res.status(400).json({ error: "Failed to create store!" })
        }

        await store.save()
        owner.store = store._id
        await owner.save()
        res.json(store)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to create store!" })
    }
})


StoreController.put('/approve/:_id', auth, async (req, res) => {
    try {
        if (!req.params._id) {
            return
        }
        
        // @ts-ignore
        const userEmail = req.decoded.user.email
        
        // authorize only admins
        // check by their email
        if(!superAdmins.includes(userEmail)){
            return res.status(400).json({error: "You don't have enough permissions!"})
        }
        
        const updatedStore = await Store.findByIdAndUpdate(req.params._id, {
            approved: true
        }, { new: true })
        res.json(updatedStore)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to create store!" })
    }
})


export default StoreController