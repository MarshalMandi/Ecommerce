import {useProductStore} from "../store/useProductStore.js"

const ProductDisplayContainer = ({productInfo}) => {
    let source = productInfo.productPhotos[0]
    console.log("the value of image source is", source)
    return (
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img className="w-full h-48 object-cover" src={source} alt="Product Image" />
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">{productInfo.productName}</h2>
                    <p className="text-sm text-gray-600 mb-3">{productInfo.productDescription}</p>
                    <div className="flex items-center justify-between text-sm mb-3">
                        <span className="text-green-600 font-medium">In Stock: {productInfo.productStock}</span>
                        <span className="text-gray-800 font-semibold text-lg">${productInfo.productPrice}</span>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-200">
                        Add to Cart
                    </button>
                </div>
        </div>

    )
}

export default ProductDisplayContainer