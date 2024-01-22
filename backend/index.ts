import express from 'express'
// Using ES6 imports
import mongoose from 'mongoose';

import ProductsController from "./controllers/ProductsController";


import dotenv from 'dotenv'
import StoreController from "./controllers/StoreController";
dotenv.config()

const PORT = process.env.PORT
const app = express()

// needed to allow parsing the request body as JSON
app.use(express.json())

// products
app.use('/api/v1/product', ProductsController)
app.use('/api/v1/products', ProductsController)

// store
app.use('/api/v1/store', StoreController)
app.use('/api/v1/stores', StoreController)



console.log("log after mongoose.connect")
app.get('/ready', (req, res) => {
    res.send('Server is running!')
})

console.log(process.env.DATABASE_URL)

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Connected to MongoDB Atlas!')
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}!`)
        })
    });

