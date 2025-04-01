import Product from "../models/product.model.js"
import cloudinary from "../libs/cloudinary.js"

export const addProduct = async (req, res) => {
    const { productName, productDescription, productSeller, productStock, productPrice, productCategory, productPhotos } = req.body

    try {
        if (!productName || !productDescription || !productSeller || !productPrice || !productCategory || !productStock || !productPhotos) {
            return res.status(400).json({ message: "All fields are required" })
        }


        // Image handling logic 
        let imagelinks = []
        for (const element of productPhotos) {
            const uploadResponse = await cloudinary.uploader.upload(element);
            imagelinks.push(uploadResponse.secure_url)            
        }

        const newProduct = new Product({
            productName,
            productDescription,
            productPrice,
            productCategory,
            productStock,
            productSeller,
            productPhotos: imagelinks
        })

        if (newProduct) {
            await newProduct.save()
            res.status(201).json(newProduct)
        } else {
            res.status(400).json({ message: "Invalid product data" })
        }

    } catch (error) {
        console.log("Error in addProduct Controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}