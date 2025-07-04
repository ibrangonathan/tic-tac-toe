import express from 'express'
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
import { connect as connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


dotenv.config()

const app = express()

const PORT = process.env.PORT

app.use(express.static('client'))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
    connectDB()
})
