import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        productDescription: {
            type: String,
            required: true,
        },
        productPrice: {
            type: Number,
            required: true,
        },
        productStock: {
            type: Number,
            required: true,
        },
        productCategory: {
            type: [String],
            required: true,
        },
        productSeller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sellers",
            required: true,
        },
        productPhotos: {
            type: [String],
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Products", productSchema);

export default Product;