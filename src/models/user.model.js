import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
    unique: true,
    minLength: 3,
    trim: true
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  phone_number: {
    type: Number,
    required: false
  },
  password: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  profilePic: {
    type: String
  },
  adresses: [
    {
      alias: {
        type: String,
        required: true,
        minLength: 3,
        trim: true
      },
      address: {
        type: String,
        required: true,
        minLength: 3,
        trim: true
      },
      reference_point: {
        type: String,
        required: true,
        minLength: 3,
        trim: true
      }
    }
  ],
  role: {
    type: String,
    enum: ['user', 'employee', 'admin', 'superadmin'],
    trim: true,
    lowercase: true,
    default: 'user'
  }
})

const User = mongoose.model('User', UserSchema)
export default User
