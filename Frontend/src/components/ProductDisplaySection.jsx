import ProductDisplayContainer from "./ProductDisplayContainer.jsx"
import { Loader } from "lucide-react"
import { useProductStore } from "../store/useProductStore.js"

const ProductDisplaySection = ({ productIds }) => {
    const {products} = useProductStore()
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {products ? products.map((product) => (
                    <ProductDisplayContainer key={product._id} productInfo={product} />
            )): null }
            <h2>this component has loaded</h2>
        </div>
    )
}

export default ProductDisplaySection