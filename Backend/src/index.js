import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./libs/database.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import sellerRoutes from "./routes/seller.route.js"

import cors from "cors"

dotenv.config()

const app = express()

app.use(express.json({ limit: '2mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: '2mb', extended: true }));

app.use(cookieParser())

// add the CORS middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

// add the required routes
app.use("/api/auth", authRoutes)

app.use("/api/seller", sellerRoutes)

// add the port and listen
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`the server is listening on http://localhost:${PORT}`)
    connectDB()
})