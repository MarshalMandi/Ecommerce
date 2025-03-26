import mongoose from "mongoose";

const sellerschema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        brand: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        photos: {
            type: [String],
        },
        role: {
            type: String,
            enum: ["user", "seller", "admin"],
            required: true,
        }
    },
    { timestamps: true }
)

const Seller = mongoose.model("Sellers", sellerschema)

export default Seller;