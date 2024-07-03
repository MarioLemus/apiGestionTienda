import bcrypt from 'bcryptjs'

export const generateHash = (value) => {
  return bcrypt.hashSync(value, 10)
}
