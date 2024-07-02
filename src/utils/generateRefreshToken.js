import jwt from 'jsonwebtoken'
import config from 'config'

export const generateRefreshToken = (userID, role) => {
  return jwt.sign({ userID, role }, config.get('refresh_tk.secret'), { expiresIn: config.get('refresh_tk.exp') })
}
