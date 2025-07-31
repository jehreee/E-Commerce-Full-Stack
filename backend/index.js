const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()

const allowedOrigins = [
  process.env.LOCAL_FRONTEND_URL,
  process.env.FRONTEND_URL
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (e.g., mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
        return callback(null, true);
        } else {
        return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api",router)

const PORT = process.env.PORT || 8080

connectDB().then(() => {

})
app.listen(PORT, () => {
    console.log("connected to DB")
    console.log("Server is running..")
})