import { Router } from "express";
import {
  ProductController,
  upload,
} from "../controllers/product.controller.js";

const router = Router();
const productController = new ProductController();

router.post("/crear-producto", upload.single("image"), (req, res) =>
  productController.crearProducto(req, res)
);

router.put("/editar-producto/:_id", upload.single("image"), (req, res) => {
  const imageFileName = req.file ? `./uploads/${req.file.filename}` : null;
  productController.editarProducto(req, res, imageFileName);
});

router.delete("/eliminar-producto/:_id", (req, res) => {
  productController.eliminarProducto(req, res);
});

router.get("/obtener-producto", (req, res) => {
  productController.obtenerProducto(req, res);
});

router.get("/buscar-producto-nombre/:name", (req, res) => {
  productController.buscarnombreProducto(req, res);
});

export default router;
