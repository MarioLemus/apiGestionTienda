import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  accessToken: {
    type: String,
    required: true,
    trim: true
  },
  refreshToken: {
    type: String,
    required: true,
    trim: true
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

const Token = mongoose.model('Token', tokenSchema)
export default Token
