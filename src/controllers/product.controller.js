import fs from 'fs'
import Products from '../models/product.model.js'
import multer from 'multer'
import { getMulterStorageConfig } from '../utils/getMulterStorageConfig.js'
import mongoose from 'mongoose'

const storage = await getMulterStorageConfig()

const upload = multer({ storage })

export class ProductController {
  async get (req, res) {
    const products = await Products.find()
    console.log(products)
    return res.status(200).json(products)
  }

  async getbyname (req, res) {
    const { name } = req.params
    console.log({ name })
    const product = await Products.findOne({ name })
    console.log(product)
    return res.status(200).json(product)
  }

  async getbycategory (req, res) {
    // eslint-disable-next-line camelcase
    const { category_id } = req.params
    const objectId = new mongoose.Types.ObjectId(category_id)
    const products = await Products.find({ categoryid: objectId })
    console.log(products)
    return res.status(200).json(products)
  }

  async create (req, res) {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: 'Error al subir la imagen' })
      }
      try {
        const { name, description, price, stock, image } = req.body
        const existingProduct = await Products.findOne({ name })
        if (existingProduct) {
          throw new Error(`El producto ${name} ya existe`)
        }

        const newProduct = new Products({
          name,
          description,
          price,
          stock,
          image,
          update_date: new Date(),
          creation_date: new Date()
        })

        console.log('Los datos del model a guardar son' + newProduct)
        const saveProduct = await newProduct.save()

        return res.status(201).json(saveProduct)
      } catch (error) {
        return res.status(500).json({ error: 'Error al crear el producto' })
      }
    })
  }

  async edit (req, res) {
    const imageFileName = req.file ? `./uploads/${req.file.filename}` : null
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: 'Error al subir la imagen' })
      }
      try {
        const _id = req.params._id
        const { name, description, price, categoryid, stock } = req.body

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
        existingProduct.categoryid = categoryid || existingProduct.categoryid
        existingProduct.stock = stock || existingProduct.stock

        console.log('new image ', imageFileName)
        if (imageFileName) {
          existingProduct.image = imageFileName
        }

        await existingProduct.save()
        return res.status(200).json(existingProduct)
      } catch (error) {
        return res.status(500).json({ error: 'Error al editar el producto' })
      }
    })
  }

  async delete (req, res) {
    try {
      const { _id } = req.params
      const product = await Products.findOne({ _id })

      if (!product) {
        throw new Error('El producto no existe')
      }

      if (product.image) {
        const imagenPath = product.image

        try {
          if (fs.existsSync(imagenPath)) {
            fs.unlinkSync(imagenPath)
            console.log('Imagen eliminada')
          } else {
            console.log('La imagen no existe:', imagenPath)
          }
        } catch (err) {
          console.error('Error al eliminar la imagen:', err)
          return res.status(500).json({ error: 'Error al eliminar la imagen' })
        }
      } else {
        console.log('No hay imagen para eliminar')
      }

      await Products.deleteOne({ _id })
      return res.status(200).json({ message: 'Producto eliminado' })
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar el producto' })
    }
  }
}
