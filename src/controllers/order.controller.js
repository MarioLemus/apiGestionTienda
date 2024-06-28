import express from 'express';
import Order from "../models/order.model.js";
import Product from '../models/product.model.js';

export class OrderController {

    static async create (req, res) {
        const now = new Date();
    
        const { id_customer, 
          customer_name, 
          id_order,  
          products,
          creation_date = now.toISOString().split('T')[0],
          update_date = now.toISOString().split('T')[0]} = req.body;

        const newOrder = new Order({id_customer, 
          customer_name, 
          id_order,   
          order_status: true, 
          products, 
          creation_date, 
          creation_time: now.toTimeString().split(' ')[0], 
          update_date, 
          update_time: now.toTimeString().split(' ')[0]});
        try{   
          const idProds = await Product.find({ '_id': { $in: products } });
          const idProdsBody = products.map(product => product.toString());
          if (idProds.length !== idProdsBody.length) {
            return res.status(400).json({ error: 'Uno o más productos no existen' });
          }
          await newOrder.save();
          res.status(201).json(newOrder);
        }catch(err){
          res.status(500).json({error: err.message});
        }
    }

    static async updateStock (req, res) { 
        const prods = await Order.find(req.body.products) 
        const prodArray = [prods]
        try{
          console.log(prodArray)
          res.status(200).json({message: 'Stock actualizado'});
        }catch(err){
          res.status(500).json({error: error.message});
        }
      }
} 