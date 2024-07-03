import fs from "fs";
import Products from "../models/product.model.js";
import multer from "multer";
import { getMulterStorageConfig } from "../utils/getMulterStorageConfig.js";
import mongoose from "mongoose";
import Token from "../models/token.model.js";

const storage = await getMulterStorageConfig();

const upload = multer({ storage });

export class ProductController {
  async get(req, res) {
    const products = await Products.find();
    console.log(products);
    return res.status(200).json(products);
  }

  async getbyname(req, res) {
    const { name } = req.params;
    console.log({ name });
    const product = await Products.findOne({ name });
    console.log(product);
    return res.status(200).json(product);
  }

  async getbycategory(req, res) {
    const { category_id } = req.params;
    const objectId = new mongoose.Types.ObjectId(category_id);
    const products = await Products.find({ categoryid: objectId });
    console.log(products);
    return res.status(200).json(products);
  }

  async create(req, res) {
    try {
      upload.single("image")(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: "Error al subir la imagen" });
        }

        try {
          const authHeader = req.headers.authorization;
          const token = authHeader.split(" ")[1];
          const mapin = await Token.findById(token);
          const userId = mapin.id_user.toString();

          const { name, description, price, stock, categoryid } = req.body;

          const existingProduct = await Products.findOne({ name });
          if (existingProduct) {
            throw new Error(`El producto ${name} ya existe`);
          }

          if (!categoryid) {
            return res
              .status(400)
              .json({ error: "El campo 'categoryid' es requerido" });
          }

          const newProduct = new Products({
            name,
            description,
            price,
            stock,
            categoryid,
            image: `./uploads/${req.file.filename}`,
            update_date: new Date(),
            creation_date: new Date(),
            createdby: userId,
            updatedby: userId,
          });

          const saveProduct = await newProduct.save();

          return res.status(201).json(saveProduct);
        } catch (error) {
          return res.status(500).json({
            error: "Error al crear el producto",
            message: error.message,
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        error: "Error interno al procesar la solicitud",
        message: error.message,
      });
    }
  }

  async edit(req, res) {
    const imageFileName = req.file ? `./uploads/${req.file.filename}` : null;
    upload.single("image")(req, res, async () => {
      try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        const mapin = await Token.findById(token);
        const userId = mapin.id_user.toString();
        const _id = req.params._id;
        const { name, description, price, categoryid, stock } = req.body;

        const existingProduct = await Products.findOne({ _id });

        if (!existingProduct) {
          throw new Error(`El producto ${name} no existe`);
        }

        if (existingProduct && existingProduct.image) {
          const imagenPath = existingProduct.image;

          try {
            if (fs.existsSync(imagenPath)) {
              fs.unlinkSync(imagenPath);
              console.log("Imagen anterior eliminada");
            } else {
              console.log("La imagen no existe:", imagenPath);
            }
          } catch (err) {
            console.error("Error al eliminar la imagen anterior:", err);
            return res
              .status(500)
              .json({ error: "Error al eliminar la imagen anterior" });
          }
        } else {
          console.log("No hay imagen para eliminar");
        }

        existingProduct.name = name || existingProduct.name;
        existingProduct.description =
          description || existingProduct.description;
        existingProduct.price = price || existingProduct.price;
        existingProduct.categoryid = categoryid || existingProduct.categoryid;
        existingProduct.stock = stock || existingProduct.stock;
        existingProduct.updatedby = userId;
        existingProduct.update_date = new Date();

        console.log("new image ", imageFileName);
        if (imageFileName) {
          existingProduct.image = imageFileName;
        }

        await existingProduct.save();
        res.status(200).json(existingProduct);
      } catch (error) {
        res.status(500).json({ error: "Error al editar el producto" });
      }
    });
  }
  async delete(req, res) {
    try {
      const { _id } = req.params;
      const product = await Products.findOne({ _id });

      if (!product) {
        throw new Error("El producto no existe");
      }

      if (product.image) {
        const imagenPath = product.image;

        try {
          if (fs.existsSync(imagenPath)) {
            fs.unlinkSync(imagenPath);
            console.log("Imagen eliminada");
          } else {
            console.log("La imagen no existe:", imagenPath);
          }
        } catch (err) {
          console.error("Error al eliminar la imagen:", err);
          return res.status(500).json({ error: "Error al eliminar la imagen" });
        }
      } else {
        console.log("No hay imagen para eliminar");
      }

      await Products.deleteOne({ _id });
      return res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
      return res.status(500).json({ error: "Error al eliminar el producto" });
    }
  }
}
