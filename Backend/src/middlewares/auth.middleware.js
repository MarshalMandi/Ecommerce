import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import Seller from '../models/seller.model.js'

export const protectRoute = async (req, res, next) => {
    let client;
    try {
        const token = req.cookies.EcommerceEntry

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" })
        }

        const user = await User.findById(decoded.clientId).select("-password")
        const seller = await Seller.findById(decoded.clientId).select("-password")

        if (!user && !seller) {
            return res.status(404).json({ message: "Account not found" })
        } else if (user) {
            client = user
        } else if (seller) {
            client = seller
        } else {
            return res.status(404).json({ message: "Account exists simultaneously as both user and seller" })
        }

        req.client = client

        next()

    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}