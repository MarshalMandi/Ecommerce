import { useEffect } from "react"
import { useAuthStore } from "./store/useAuthStore.js"
import { Toaster } from "react-hot-toast"
import { Loader } from "lucide-react"
import { Routes, Route, Navigate } from "react-router-dom"

import UserSignUpPage from "./pages/User.SignUpPage.jsx"
import SellerSignUpPage from "./pages/Seller.SignUpPage.jsx"
import LogInPage from "./pages/LogInPage.jsx"
import UserHomePage from "./pages/User.HomePage.jsx"
import SellerHomePage from "./pages/Seller.HomePage.jsx"
import InfoPage from "./pages/InfoPage.jsx"

import Navbar from "./components/Navbar.jsx"

let App = () => {
  const { authClient, checkAuth, isCheckingAuth } = useAuthStore()
  let targetpath;

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (authClient) {
    if (authClient.role === "user") {
      targetpath = `/user/${authClient._id}/home`
    } else if (authClient.role === "seller") {
      targetpath = `/seller/${authClient._id}/home`
    } else {
      targetpath = `/`
    }  
  }

  if (isCheckingAuth && !authClient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={!authClient ? <InfoPage /> : <Navigate to={targetpath} />} />
        <Route path="/login" element={!authClient ? <LogInPage /> : <Navigate to={"/"} />} />
        <Route path="/signupUser" element={!authClient ? <UserSignUpPage /> : <Navigate to={"/"} />} />
        <Route path="/signupSeller" element={!authClient ? <SellerSignUpPage /> : <Navigate to={"/"} />} />
        {/* Homepage for guests */}
        {/* Productpage for guests */}
        <Route path="/user/:userId/home" element={authClient ? <UserHomePage clientInfo={authClient} /> : <Navigate to={"/login"} />} />
        <Route path="/seller/:sellerId/home" element={authClient ? <SellerHomePage clientInfo={authClient} />: <Navigate to={"/login"} />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
