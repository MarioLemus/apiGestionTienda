import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    minLength: 3,
    trim: true,
  },
  updatedby: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    minLength: 3,
    trim: true,
    default: null,
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    min: 0,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  update_date: {
    type: Date,
    required: true,
  },
  creation_date: {
    type: Date,
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
