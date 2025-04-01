import { useState } from "react";
import { Camera } from "lucide-react";
import { useSellerStore } from "../store/useSellerStore.js";

const PostProductPage = ({ clientInfo }) => {
    const { addProduct } = useSellerStore()

    const [productImages, setProductImages] = useState([]);

    const [product, setProduct] = useState({
        productName: "",
        productDescription: "",
        productPrice: "",
        productStock: "",
        productCategory: "",
        productPhotos: null,
    });

    const handleImageChange = async (e) => {
        const files = e.target.files;
        const uploadedImages = [];
        if (files.length > 3 || files.length < 1) {
            alert("Please upload between 1 to 3 images.");
            return;
        }
        for (const file of files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64Image = reader.result;
                uploadedImages.push(base64Image);
            }
        }
        setProductImages(uploadedImages);
    }

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleCategory = () => {
        let listofcategories = product.productCategory.split(" ")
        return listofcategories;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Product Added:", product);
        // console.log("Product Images:", productImages);
        let listcategories = handleCategory()
        // Add your API call or logic to save product
        // console.log("the data being sent is", { ...product, productCategory: listcategories, productPhotos: productImages, productSeller: clientInfo._id })
        addProduct({ ...product, productCategory: listcategories, productPhotos: productImages, productSeller: clientInfo._id })

    };

    return (
        <div className="h-screen pt-20">
            <div className="max-w-2xl mx-auto p-4 py-8">
                <div className="bg-base-300 rounded-xl p-6 space-y-8">
                    <h1 className="text-2xl font-semibold text-center">Add Product</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex items-center justify-center">
                            <label htmlFor="avatar-upload" className={`
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                `}
                            >
                                <Camera className="w-5 h-5 text-base-200" />
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    multiple
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-400">Product Name</label>
                            <input
                                type="text"
                                name="productName"
                                value={product.productName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-base-200 rounded-lg border"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-400">Description</label>
                            <textarea
                                name="productDescription"
                                value={product.productDescription}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-base-200 rounded-lg border"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-400">Price ($)</label>
                            <input
                                type="number"
                                name="productPrice"
                                value={product.productPrice}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-base-200 rounded-lg border"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-400">Stock Quantity</label>
                            <input
                                type="number"
                                name="productStock"
                                value={product.productStock}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-base-200 rounded-lg border"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-400">Category</label>
                            <input
                                type="text"
                                name="productCategory"
                                value={product.productCategory}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-base-200 rounded-lg border"
                                required
                            />
                        </div>

                        <button type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                        >Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PostProductPage;