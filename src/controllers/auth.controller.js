import config from 'config'
import jwt from 'jsonwebtoken'
import { generateAccessToken } from '../utils/generateAccessToken.js'
import { httpOnly } from '../constants/config/httpOnly.js'
import { decrypt, encrypt } from '../utils/cryptoUtil.js'
import { generateRefreshToken } from '../utils/generateRefreshToken.js'
import User from '../models/user.model.js'
import RefreshToken from '../models/refreshToken.model.js'

export class AuthController {
  static async signup (req, res) {
    // eslint-disable-next-line camelcase
    const { username, name, email, password, phone_number, profilePic, addresses } = req.body

    try {
      // eslint-disable-next-line camelcase
      await User.create({ username, name, email, password, phone_number, profilePic, addresses })
      return res.status(201).json({ message: 'User created' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }

  static async login (req, res) {
    // Invalidate a remaining "refreshTokenID" in cookies
    const { refreshTokenID } = req.cookies
    if (refreshTokenID) {
      const refreshObj = await RefreshToken.findById(refreshTokenID)
      refreshObj.is_used = true
      await refreshObj.save()
    }
    const { email, password } = req.body
    try {
      const user = await User.findOne({ email })
      if (!user) return res.status(404).json({ message: 'User not found' })
      if (user.password !== password.trim().toLowerCase()) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }
      const accessToken = generateAccessToken(user._id, user.role)
      const refreshToken = generateRefreshToken(user._id, user.role)
      try {
        const dbToken = await RefreshToken.create({
          token: encrypt(refreshToken),
          userID: user._id,
          role: user.role,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
        })
        res.cookie('refreshTokenID', dbToken._id, httpOnly)
        return res.json({ accessToken })
      } catch (error) {
        res.status(500).json({ error })
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }

  static async refreshToken (req, res) {
    const { refreshTokenID } = req.cookies
    if (!refreshTokenID) return res.sendStatus(401)

    try {
      const refreshObj = await RefreshToken.findById(refreshTokenID)
      if (refreshObj.is_used) return res.status(403).send('Invalid refresh token')

      jwt.verify(decrypt(refreshObj.token), config.get('refresh_tk.secret'), async (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid refresh token' })
        const accessToken = generateAccessToken(user.userID, user.role)
        const refreshToken = generateRefreshToken(user.userID, user.role)
        // change token status to used
        refreshObj.is_used = true
        await refreshObj.save()

        try {
          const dbToken = await RefreshToken.create({
            token: encrypt(refreshToken),
            userID: user.userID,
            role: user.role,
            is_used: false,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
          })
          res.cookie('refreshTokenID', dbToken._id, httpOnly)
          return res.json({ accessToken })
        } catch (error) {
          res.status(500).json({ error })
        }
      })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}
