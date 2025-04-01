import { Router } from "express";
import { addProduct } from "../controllers/seller.controller.js";
import { protectSellerRoute } from "../middlewares/seller.middleware.js";

const router = Router()

// add product route
router.post("/addproduct", protectSellerRoute, addProduct)

export default router