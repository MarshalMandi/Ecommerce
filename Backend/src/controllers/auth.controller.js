import { generateToken } from "../libs/token.js"
import User from "../models/user.model.js"
import Seller from "../models/seller.model.js"
import bcrypt from "bcryptjs"

// controller for user signup
export const signUpUser = async (req, res) => {
    // gets the variables from the body
    const { fullName, email, password } = req.body

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const user = await User.findOne({ email })
        const seller = await Seller.findOne({ email })

        if (user || seller) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            role: "user",
        })

        if (newUser) {
            // generate JWT token here
            generateToken({ clientId: newUser._id, clientRole: newUser.role }, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                role: newUser.role,
                profilePic: newUser.profilePic,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            })
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error in SignUpUser Controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const signUpSeller = async (req, res) => {
    const { fullName, email, password, brand, description, photos } = req.body;
    try {
        if (!fullName || !email || !password || !brand || !description || !photos) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must at least be 6 characters" })
        }
        const user = await User.findOne({ email })
        const seller = await Seller.findOne({ email })

        if (user || seller) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        const newSeller = new Seller({
            fullName,
            email,
            password: hashedPassword,
            brand,
            description,
            photos,
            role: "seller",
        })

        if (newSeller) {
            generateToken({ clientId: newSeller._id, clientRole: newSeller.role }, res)
            await newSeller.save()

            res.status(201).json({
                _id: newSeller._id,
                fullName: newSeller.fullName,
                email: newSeller.email,
                role: newSeller.role,
                brand: newSeller.brand,
                description: newSeller.description,
                photos: newSeller.photos,
                createdAt: newSeller.createdAt,
                updatedAt: newSeller.updatedAt
            })
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error in SignUpSeller Controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        const seller = await Seller.findOne({ email })
        let client;

        if (!user && !seller) {
            return res.status(400).json({ message: "Invalid Credentials" })
        } else if (user) {
            client = user
        } else if (seller) {
            client = seller
        } else {
            return res.status(400).json({ message: "The same credentials exists both as user and seller" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, client.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        generateToken({ clientId: client._id, clientRole: client.role }, res)

        res.status(200).json({
            _id: client._id,
            fullName: client.fullName,
            email: client.email,
            role: client.role,
            profilePic: client.profilePic,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        })

    } catch (error) {
        console.log("Error in Login Controller", error.message)
        res.status(200).json({ message: "Internal Server Error" })
    }
}

export const logout = (req, res) => {
    console.log("the value of req and res inside logout in auth.controller.js is", req, res)
    try {
        res.cookie("EcommerceEntry", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged Out Successfully" })
    } catch (error) {
        console.log("Error in Logout Controller", error.message)
        res.status(400).json({ message: "Internal Server Error" })
    }
}

export const checkAuthentication = (req, res) => {
    console.log("the value of req and res inside checkAuth in auth.controller.js is", req, res)
    try {
        res.status(200).json(req.client)
    } catch (error) {
        console.log("Error in CheckAuth controller", error.message)
    }
}