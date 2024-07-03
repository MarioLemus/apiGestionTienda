/* eslint-disable camelcase */
import config from 'config'
import { generateAccessToken } from '../utils/generateAccessToken.js'
import { decrypt, encrypt } from '../utils/cryptoUtil.js'
import { generateRefreshToken } from '../utils/generateRefreshToken.js'
import User from '../models/user.model.js'
import Token from '../models/token.model.js'
import { verifyTokenValidity } from '../utils/verifyTokenValidity.js'

export class AuthController {
  static async signup (req, res) {
    const { username, name, email, password, phone_number, profilePic, addresses } = req.body
    try {
      await User.create({ username, name, email, password, phone_number, profilePic, addresses })
      return res.status(201).json({ message: 'User created' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }

  static async login (req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email })
      .catch(e => res.status(500).json({ message: 'Query failed', error: e }))

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    } else if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    await Token.find({ id_user: user._id })
      .updateMany({ is_used: true })
      .catch(e => res.status(500).json({ message: 'Something went wrong updating Token entity', error: e }))

    await Token.create({
      id_user: user._id,
      accessToken: encrypt(generateAccessToken(user._id, user.role)),
      refreshToken: encrypt(generateRefreshToken(user._id, user.role)),
      role: user.role,
      is_used: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    })
      .then(token => res.status(200).json({ ctks_id: token._id }))
      .catch(e => res.status(500).json({ message: 'Token entity could not be created ', error: e }))
  }

  static async refreshToken (req, res) {
    const { ctks_id } = req.body
    if (!ctks_id) return res.sendStatus(401)

    const { is_used, refreshToken, id_user } = await Token.findById(ctks_id)
    const isTokenValid = await verifyTokenValidity(decrypt(refreshToken), config.get('refresh_tk.secret'))

    if (is_used || isTokenValid === false) return res.status(403).send('Invalid refresh token')

    await Token.findById(ctks_id)
      .updateOne({ is_used: true })
      .catch(e => res.status(500).json({ message: 'Something went wrong updating Token entity', error: e }))

    const user = await User.findById(id_user)
      .catch(e => res.status(500).json({ message: 'Query failed', error: e }))

    await Token.create({
      id_user,
      accessToken: encrypt(generateAccessToken(user._id, user.role)),
      refreshToken: encrypt(generateRefreshToken(user._id, user.role)),
      role: user.role,
      is_used: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    })
      .then(token => res.status(200).json({ ctks_id: token._id }))
      .catch(e => res.status(500).json({ message: 'Token entity could not be created', error: e }))
  }
}
