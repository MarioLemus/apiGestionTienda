import mongoose from 'mongoose'

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    trim: true
  },
  userID: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  is_used: {
    type: Boolean,
    required: true,
    default: false
  },
  expires: {
    type: Date,
    required: true
  }
})

export default mongoose.model('RefreshToken', refreshTokenSchema)
