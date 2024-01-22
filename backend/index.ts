import express from 'express'
// Using ES6 imports
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import ProductsController from "./controllers/ProductsController";
import StoreController from "./controllers/StoreController";
import UsersController from './controllers/UsersController';
import ReviewController from './controllers/ReviewController';
import OrderController from './controllers/OrderController';
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

// users
app.use('/api/v1/user', UsersController)
app.use('/api/v1/users', UsersController)

// reviews
app.use('/api/v1/review', ReviewController)
app.use('/api/v1/reviews', ReviewController)

//orders
app.use('/api/v1/order', OrderController)
app.use('/api/v1/orders', OrderController)


console.log("log after mongoose.connect")
app.get('/ready', (req, res) => {
    res.send('Server is running well!')
})

console.log(process.env.DATABASE_URL)

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Connected to MongoDB Atlas!')
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}!`)
        })
    });

