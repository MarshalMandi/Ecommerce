import { generateToken } from "../libs/token.js"
import User from "../models/user.model.js"
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

        if (user) {
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
            generateToken({ userId: newUser._id, userRole: newUser.role }, res)
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
        console.log("Error in Signup Controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        generateToken({ userId: user._id, userRole: user.role }, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            profilePic: user.profilePic,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt

        })

    } catch (error) {
        console.log("Error in Login Controller", error.message)
        res.status(200).json({ message: "Internal Server Error" })
    }
}

export const logout = (req, res) => {
    console.log("the value of req and res inside logout in auth.controller.js is", req, res)
    try {
        res.cookie("EcommerceEntry", "", {maxAge:0})
        res.status(200).json({ message: "Logged Out Successfully" })
    } catch (error) {
        console.log("Error in Logout Controller", error.message)
        res.status(400).json({ message: "Internal Server Error"})
    }
}

export const checkAuthentication = (req, res) => {
    console.log("the value of req and res inside checkAuth in auth.controller.js is", req, res)
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in CheckAuth controller", error.message )
    }
}