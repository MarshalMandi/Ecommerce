import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
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
        profilePic: {
            type: String,
            default: "",
        },
        role: {
            type: String,
            enum: ["user", "seller", "admin"],
            required: true,
        }
    },
    { timestamps: true }
)

const User = mongoose.model("Users", userSchema)

export default User;