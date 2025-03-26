import { Router } from "express"
import { signUpSeller, signUpUser, login, logout, checkAuthentication } from "../controllers/auth.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js"

const router = Router()

// user signup route
router.post("/signupuser", signUpUser)

// seller signup route
router.post("/signupseller", signUpSeller)

// login route
router.post("/login", login)

// logout route
router.post("/logout", logout)

// check authentication route
router.get("/check", protectRoute, checkAuthentication)

export default router