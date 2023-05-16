const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require("./routers/Router");
require('dotenv').config(); // For .env files

// Router import
// const router = require()

// Server port
const EXPRESS_PORT = process.env.EXPRESS_PORT || 5000
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/graphs'

// Express app
const app = express()

// Query body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// CORS
app.use(cors())

// Routes
app.use("/", router)


const start = () => {
    try {
        mongoose.connect(MONGO_URL)
        app.listen(EXPRESS_PORT, () => console.log(`🚀 Server started on port ${EXPRESS_PORT}`))
    } catch (e) {

    }
}

start()

module.exports = app