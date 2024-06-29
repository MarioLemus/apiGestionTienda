import fs from 'fs'
import Products from '../models/product.model.js'
import multer from 'multer'
import { getMulterStorageConfig } from '../utils/getMulterStorageConfig.js'

const storage = getMulterStorageConfig()

export const upload = multer({ storage })

export class ProductController {
  async obtenerProducto (req, res) {
    const products = await Products.find()
    console.log(products)
    res.status(200).json(products)
  }

  async buscarnombreProducto (req, res) {
    const { name } = req.params
    console.log({ name })
    const product = await Products.findOne({ name })
    console.log(product)
    res.status(200).json(product)
  }

  async crearProducto (req, res) {
    try {
      const { name, description, price, category, stock } = req.body

      const existingProduct = await Products.findOne({ name })
      if (existingProduct) {
        throw new Error(`El producto ${name} ya existe`)
      }

      const newProduct = new Products({
        name,
        description,
        price,
        category,
        stock,
        image: `./uploads/${req.file.filename}`,
        update_date: new Date(),
        creation_date: new Date()
      })

      console.log('Los datos del model a guardar son' + newProduct)
      const saveProduct = await newProduct.save()

      res.status(201).json(saveProduct)
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el producto' })
    }
  }

  async editarProducto (req, res, imageFileName) {
    try {
      const _id = req.params._id
      const { name, description, price, category, stock } = req.body

      const existingProduct = await Products.findOne({ _id })

      if (!existingProduct) {
        throw new Error(`El producto ${name} no existe`)
      }

      if (existingProduct && existingProduct.image) {
        const imagenPath = existingProduct.image

        try {
          if (fs.existsSync(imagenPath)) {
            fs.unlinkSync(imagenPath)
            console.log('Imagen anterior eliminada')
          } else {
            console.log('La imagen no existe:', imagenPath)
          }
        } catch (err) {
          console.error('Error al eliminar la imagen anterior:', err)
          return res
            .status(500)
            .json({ error: 'Error al eliminar la imagen anterior' })
        }
      } else {
        console.log('No hay imagen para eliminar')
      }

      existingProduct.name = name || existingProduct.name
      existingProduct.description = description || existingProduct.description
      existingProduct.price = price || existingProduct.price
      existingProduct.category = category || existingProduct.category
      existingProduct.stock = stock || existingProduct.stock

      console.log('new image ', imageFileName)
      if (imageFileName) {
        existingProduct.image = imageFileName
      }

      await existingProduct.save()
      res.status(200).json(existingProduct)
    } catch (error) {
      res.status(500).json({ error: 'Error al editar el producto' })
    }
  }

  async eliminarProducto (req, res) {
    try {
      const product = await Products.findByIdAndDelete(req.params._id)
      if (!product) {
        res.status(500).json({ error: 'no existe el producto' })
      }
      const imagenPath = product.image
      console.log('imagen a eliminar ' + imagenPath)
      try {
        if (fs.existsSync(imagenPath)) {
          fs.unlinkSync(imagenPath)
          console.log('Imagen anterior eliminada')
          res.status(200).json('Registro eliminado')
        } else {
          console.log('La imagen no existe:', imagenPath)
        }
      } catch (err) {
        console.error('Error al eliminar la imagen anterior:', err)
        return res
          .status(500)
          .json({ error: 'Error al eliminar la imagen anterior' })
      }
    } catch (error) {
      res.status(500).json({ error: 'error al eliminar' })
    }
  }
}
