import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";
import { validateToken } from "../middlewares/validateToken.js";
const router = Router();
const categoryController = new CategoryController();

router.post("/category", validateToken, categoryController.post);
router.put("/category/:_id", validateToken, categoryController.put);
router.delete("/category/:_id", validateToken, categoryController.delete);
router.get("/category", validateToken, categoryController.get);
router.get("/category/:name", validateToken, categoryController.getbyname);

export default router;
