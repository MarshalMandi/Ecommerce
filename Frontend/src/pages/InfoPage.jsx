const InfoPage = () => {
    return (
        <div className="h-screen bg-base-200">
            <div className="flex items-center justify-center pt-20 px-4">
                {/* This is the main content container */}
                <div className="bg-base-100 rounded-lg shadow-cl w-full h-[calc(100vh-8rem)]">
                    {/* Place a container that will contain the carousel and about shopsphere section side by side */}
                    <div className="w-full p-4 bg-gray-100 flex gap-4 flex-row">
                        {/* About shopsphere div */}
                        <div className="w-[calc(50%-0.5rem)] flex items-center justify-center">
                            <div className="flex flex-col w-full h-full items-center gap-2">
                                <h1 className="text-3xl font-bold">About ShopSphere</h1>
                                <p className=" text-lg text-justify">
                                    Welcome to ShopSphere, where your shopping experience is redefined with transparency, care, and excellence. Our platform is dedicated to providing seamless purchases, timely deliveries, and unwavering support. At ShopSphere, we believe in earning your trust by ensuring every transaction is straightforward and honest. We prioritize delivering your orders with utmost care, ensuring they reach you safely and promptly. With our commitment to exceptional customer support, we're here to assist you every step of the way. ShopSphere is not just a marketplace—it's a space where your needs are understood and valued. Experience the future of online shopping with us!
                                </p>
                            </div>
                        </div>
                        {/* Carousel div */}
                        <div className="w-[calc(50%-0.5rem)] flex items-center">
                            <div className="carousel w-full">
                                <div id="item1" className="carousel-item w-full">
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                                        className="w-full" />
                                </div>
                                <div id="item2" className="carousel-item w-full">
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                                        className="w-full" />
                                </div>
                                <div id="item3" className="carousel-item w-full">
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                                        className="w-full" />
                                </div>
                                <div id="item4" className="carousel-item w-full">
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                                        className="w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoPage