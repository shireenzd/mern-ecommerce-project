import express from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const TOKEN_SECRET = process.env.TOKEN_SECRET

import User from '../models/User'


const saltRounds = 10;
const UsersController = express.Router()

// Should remove
UsersController.get('/list', async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to create User!" })
    }
})

UsersController.post('/register', async (req, res) => {
    try {

        // TODO validate email regex
        const {
            name,
            email,
            password,
        } = req.body

        if (!name || !email || !password) {
            return;
        }
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const user = new User({
            name,
            email,
            password: hashedPassword,
        })

        const error = user.validateSync();
        if (error) {
            console.log(error)
            return res.status(400).json({ error: "Failed to register!" })
        }

        await user.save()

        console.log(user)
        let token = jwt.sign({ user: { ...user?.toJSON(), password: '' } }, TOKEN_SECRET)
        res.json({ token })

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to create User!" })
    }
})


UsersController.post('/login', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        const user = await User.findOne({
            email
        })

        if (!user) {
            res.status(401).json({ error: "User not found! Please register" })
        }

        // verify password
        // @ts-ignore
        const verification = bcrypt.compareSync(password, user.password);

        if (!verification) {
            return res.status(400).json({ error: "Credentials wrong!" })
        }
        console.log(user)
        let token = jwt.sign({ user: { ...user?.toJSON(), password: '' } }, TOKEN_SECRET)
        res.json({ token })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to create User!" })
    }
})

export default UsersController;