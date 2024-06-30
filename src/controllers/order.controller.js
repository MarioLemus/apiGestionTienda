import express from 'express';
import Order from "../models/order.model.js";
import Product from '../models/product.model.js';

export class OrderController {

    static async create (req, res) {
        const now = new Date();

        const timeoutPromise = (ms, promise) => {
          return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
              reject(new Error(`Timeout after ${ms} ms`));
            }, ms);
        
            promise.then(resolve, reject).finally(() => clearTimeout(timer));
          });
        };

        const { id_customer, 
          customer_name, 
          id_order,
          payment_method,
          need_change_from_payment,
          change_amount,
          total,
          products: requestedProducts,
          creation_date = now.toISOString().split('T')[0],
          update_date = now.toISOString().split('T')[0]} = req.body;

        try {
          const products = await Promise.all(requestedProducts.map(async (prod) => {
            const productDetails = await timeoutPromise(5000, Product.findById(prod.id_product));

            if (!productDetails) {
              throw new Error(`Producto con id ${prod.id_product} no encontrado`);
            }

            productDetails.stock = productDetails.stock - prod.quantity
            await productDetails.save()

            return {
              product: {
                id_product: productDetails._id,
                name: productDetails.name,
                price: productDetails.price,
                quantity: prod.quantity
              }
            }  
        }))   

        const newOrder = new Order({id_customer, 
          customer_name, 
          id_order,   
          payment_method,
          need_change_from_payment,
          change_amount,
          total,
          products, 
          creation_date, 
          creation_time: now.toTimeString().split(' ')[0], 
          update_date, 
          update_time: now.toTimeString().split(' ')[0]
        });  

        
          await newOrder.save();  
          res.status(201).json(newOrder);
          
        }catch(err){
          res.status(500).json({error: err.message});
        }
    }

    static async updatedStatus (req, res) {
      const { _id } = req.params
      try {
          const order = await Order.findById(_id)
          if (!order) {
            throw new Error(`La orden con ID: ${_id} no existe`)
          }
          order.is_Cancelled = true
          
          const orderArray = order.products.map((prod) => ({
            id_product: prod.product.id_product, 
            quantity: prod.product.quantity
          }));
      

          const updates = orderArray.map((item) => {
            return Product.findByIdAndUpdate(
              item.id_product,
              { $inc: { stock: item.quantity } }
            );
          });
          
          await Promise.all(updates);

          await order.save()
          res.status(201).json(order);
      } catch (err) {
        res.status(500).json({error: err.message});
      }
    }
} 