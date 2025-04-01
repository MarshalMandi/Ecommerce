import jwt from 'jsonwebtoken'
import Seller from '../models/seller.model.js'

export const protectSellerRoute = async (req, res, next) => {
    try {
        const token = req.cookies.EcommerceEntry

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" })
        }

        const seller = await Seller.findById(decoded.clientId).select("-password")

        if (!seller) {
            return res.status(404).json({ message: "Seller not found" })
        }

        req.seller = seller

        next()

    } catch (error) {
        console.log("Error in protectSellerRoute middleware:", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}