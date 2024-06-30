import User from '../models/user.model.js'
/*
import config from 'config'
import jwt from 'jsonwebtoken'
import { generateAccessToken } from '../utils/generateAccessToken'
import httpOnly from '../constants/config/httpOnly'
*/
export class AuthController {
  static async signup (req, res) {
    const { name, email, password, profilePic } = req.body

    try {
      await User.create({ name, email, password, profilePic })
      res.status(201).json({ message: 'User created' })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async login (req, res) {
    const { email, password } = req.body
    try {
      await User.findOne({ email }, (err, user) => {
        if (err) {
          res.status(500).json({ message: 'Internal server error' })
        }
        if (!user) {
          res.status(404).json({ message: 'User not found' })
        }
        if (user.password !== password.trim().toLowerCase()) {
          res.status(401).json({ message: 'Invalid credentials' })
        }
        res.status(200).json({ message: 'Login successful' })
      })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async refreshToken (req, res) {
    // todo: implement database storage for refresh tokens
    /*
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(401)

    jwt.verify(refreshToken, config.get('refresh_tk.secret'), (err, user) => {
      if (err) return res.sendStatus(403)

      const accessToken = generateAccessToken({ name: user.name, role: user.role })
      // const newRefreshToken = jwt.sign({ name: user.name }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' })

      res.cookie('refreshToken', newRefreshToken, httpOnly)
      res.json({ accessToken })
    })
      */
  }
}
