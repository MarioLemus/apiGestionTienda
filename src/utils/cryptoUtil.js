import crypto from 'crypto'
import config from 'config'
import { Buffer } from 'buffer'

const secretKey = config.get('crypto.secret')
const algorithm = 'aes-256-cbc'
const iv = crypto.randomBytes(16) // Generar un vector de inicialización de 16 bytes

export function encrypt (text) {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

export function decrypt (encrypted) {
  const ivf = iv.toString('hex')
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(ivf, 'hex'))
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}
