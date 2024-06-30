import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export class UserController {
  static async getAll (req, res) {
    try {
      const users = await User.find().select('-password')
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async create (req, res) {
    // eslint-disable-next-line camelcase
    const { username, name, email, phone_number, password, adresses, role } = req.body
    const profilePic = req.file ? req.file.filename : null

    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      // eslint-disable-next-line camelcase
      const newUser = new User({ username, name, email, phone_number, password: hashedPassword, profilePic, adresses, role })
      await newUser.save()
      res.status(201).json(newUser)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async getOne (req, res) {
    try {
      const user = await User.findById(req.params.id).select('-password')
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
      }
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ err: err.message })
    }
  }

  static async updateOne (req, res) {
    // eslint-disable-next-line camelcase
    const { username, name, email, phone_number, password, adresses, role } = req.body
    const profilePic = req.file ? req.file.filename : null

    try {
      const user = await User.findById(req.params.id)
      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' })
      }

      if (password) {
        user.password = await bcrypt.hash(password, 10)
      }

      user.username = username || user.username
      user.name = name || user.name
      user.email = email || user.email
      // eslint-disable-next-line camelcase
      user.phone_number = phone_number || user.phone_number
      user.adresses = adresses || user.adresses
      user.role = role || user.role

      if (profilePic) {
        user.profilePic = profilePic
      }
      await user.save()
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async deleteOne (req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
      }
      if (user.profilePic) {
        const profilePicPath = path.join(__dirname, '..', '..', 'uploads', user.profilePic)
        fs.access(profilePicPath, fs.constants.F_OK, (err) => {
          if (err) {
            console.error('Archivo no existe:', profilePicPath)
          } else {
            fs.unlink(profilePicPath, (err) => {
              if (err) {
                console.error('Error al eliminar imagen:', err)
                return res.status(500).json({ error: 'Error al eliminar imagen' })
              }
              console.log('Imagen eliminada:', user.profilePic)
            })
          }
        })
      }
      res.status(200).json({ message: 'Deleted user' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}
