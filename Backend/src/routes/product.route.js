import { Router } from "express";

import { getAllProducts, getEveryProduct, getProductById } from "../controllers/product.controller.js";

const router = Router()

router.get("/getallproducts", getAllProducts)
router.get("/geteveryproduct", getEveryProduct)
router.get("/getproduct/:id", getProductById)

export default router