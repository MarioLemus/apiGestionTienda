import mongoose from 'mongoose'
import Product from './product.model'

// ! envios disponibles solo dentro del mismo municipio/distrito
const OrderSchema = new mongoose.Schema({
  id_customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    minLength: 3,
    trim: true
  },
  customer_name: {
    type: String,
    required: true,
    minLength: 3,
    trim: true
  },
  id_receipt_order: {
    type: String,
    required: true,
    minLength: 3,
    trim: true
  },
  is_gift: {
    type: Boolean,
    required: true,
    default: false
  },
  receiver_name: {
    type: String,
    required: true,
    minLength: 3,
    trim: true
  },
  receiver_phone_number: {
    type: Number,
    required: true
  },
  payment_method: {
    enum: ['efectivo', 'tarjeta'],
    required: true,
    minLength: 3,
    trim: true,
    default: 'tarjeta'
  },
  need_change_from_payment: {
    type: Boolean,
    required: true,
    default: false
  },
  change_amount: {
    type: Number,
    required: true,
    default: 0
  },
  total: {
    type: Number,
    required: true,
    default: 0
  },
  order_status: {
    type: Boolean,
    required: true,
    default: true
  },
  products: {
    type: [Product],
    required: true
  },
  creation_date: {
    type: Date,
    required: true
  },
  creation_time: {
    type: String,
    required: true
  },
  update_date: {
    type: Date,
    required: true
  },
  update_time: {
    type: String,
    required: true
  }
})

const Order = mongoose.model('Order', OrderSchema)
export default Order
