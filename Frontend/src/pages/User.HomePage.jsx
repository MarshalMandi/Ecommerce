import { useEffect } from "react"
import ProductDisplaySection from "../components/ProductDisplaySection.jsx"
import { useProductStore } from "../store/useProductStore.js"

const UserHomePage = ({clientInfo}) => {
    let { products, geteveryproduct } = useProductStore()
    useEffect(() => {
        geteveryproduct()
    }, [])
    return (
        <div className="h-screen bg-base-200">
            <div className="flex items-center justify-center pt-20 px-4">
                <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                    <div className="flex flex-col items-center h-full rounded-lg overflow-hidden">
                        <p>This is the home page for Users.</p>
                        <p>The value of userInfo is {JSON.stringify(clientInfo)}</p>
                        {console.log("the value of products is ", products)}
                        <ProductDisplaySection productIds={products} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserHomePage