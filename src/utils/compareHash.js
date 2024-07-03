import bcryptjs from 'bcryptjs'

export const compareHash = (value, hash) => {
  return bcryptjs.compareSync(value, hash)
}
