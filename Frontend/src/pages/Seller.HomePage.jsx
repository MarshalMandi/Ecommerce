const SellerHomePage = ({clientInfo}) => {
    return (
        <div className="h-screen bg-base-200">
            <div className="flex items-center justify-center pt-20 px-4">
                <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                    <div className="flex flex-col items-center h-full rounded-lg overflow-hidden">
                        <p>This is the home page for Sellers.</p>
                        <p>The value of clientInfo is {JSON.stringify(clientInfo)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerHomePage