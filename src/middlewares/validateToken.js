import config from 'config'
import Token from '../models/token.model.js'
import { decrypt } from '../utils/cryptoUtil.js'
import { verifyTokenValidity } from '../utils/verifyTokenValidity.js'

export const validateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization
  const tokenID = authHeader && authHeader.split(' ')[1]
  if (!tokenID) return res.sendStatus(401)

  const { accessToken } = await Token.findById(tokenID)
    .catch(e => res.status(500).json({ message: 'Query failed', error: e }))

  const isValidToken = await verifyTokenValidity(decrypt(accessToken), config.get('tk.secret'))
  if (isValidToken === false) return res.sendStatus(401)
  next()
}
