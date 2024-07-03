import jwt from 'jsonwebtoken'

export const verifyTokenValidity = async (token, secret) => {
  if (!token) throw new Error('Token not found')
  else if (!secret) throw new Error('Secret not found')
  try {
    return await !!jwt.verify(token, secret)
  } catch (error) {
    return false
  }
}
