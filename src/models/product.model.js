import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    minLength: 3,
    trim: true
  },
  updatedby: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    minLength: 3,
    trim: true,
    default: null
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  price: {
    type: Number,
    min: 0,
    default: 0
  },
  categoryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 1,
    default: 0
  },
  image: {
    type: String,
    required: true,
    default: null
  },
  update_date: {
    type: Date,
    default: new Date()
  },
  creation_date: {
    type: Date,
    default: new Date()
  }
})

const Product = mongoose.model('Product', ProductSchema)
export default Product
