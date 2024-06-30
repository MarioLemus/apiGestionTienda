import jwt from 'jsonwebtoken'
import config from 'config'

export const generateAccessToken = (user, role) => {
  return jwt.sign({ user, role }, config.get('tk.secret'), { expiresIn: config.get('tk.exp') })
}
