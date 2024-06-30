import jwt from 'jsonwebtoken'
import config from 'config'

export const generateAccessToken = (userID, role) => {
  return jwt.sign({ userID, role }, config.get('tk.secret'), { expiresIn: config.get('tk.exp') })
}
