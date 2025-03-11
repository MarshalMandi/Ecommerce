import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./libs/database.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"

dotenv.config()

const app = express()

app.use(express.json({ limit: '2mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: '2mb', extended: true }));

app.use(cookieParser())

// add the CORS middleware

// add the required routes
app.use("/api/auth", authRoutes)

// add the port and listen
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`the server is listening on http://localhost:${PORT}`)
    connectDB()
})