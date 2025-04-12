import Product from "../models/product.model.js";
import cloudinary from "../libs/cloudinary.js";

export const getEveryProduct = async (req, res) => {
    try {
        const products = await Product.find({}).select();
        res.status(200).json(products);
    } catch (error) {
        console.log("Error fetching products:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        // const products = await Product.find({}).populate("sellerId", "-password");
        const products = await Product.find({}, { projection: { _id: 1 } })
        const idList = products.map(doc => doc._id);
        console.log("ID List:", idList); // Log the ID list to the console
        res.status(200).json(idList);
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id).select("-password");
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}