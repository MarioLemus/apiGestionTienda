import express from 'express';
import User from "../models/user.model.js";

export class UserController {
  static async getAll (req, res) {
    try{
      const usuarios = await User.find().select('-password');
      res.status(200).json(usuarios);
    }catch(err){
      res.status(500).json({error: err.message});
    }
  }

  static async create (req, res) {
    const { name, email, password, profilePic, role } = req.body;
    const newUser = new User({name, email, password, profilePic, role});
    try{
      await newUser.save();
      res.status(201).json(newUser);
    }catch(err){
      res.status(500).json({error: err.message});
    }
  }

  static async getOne (req, res) {
    try{
      const user = await User.findById(req.params.id).select('-password');
      if(!user){
        return res.status(404).json({error: 'Usuario no encontrado'});
      }
      res.status(200).json(user);
    }catch(err){
      res.status(500).json({err: err.message});
    }
  }

  static async updateOne (req, res) {
    const { name, email, password, profilePic, role } = req.body;
    try{
      const user = await User.findById(req.params.id);
      if(!user){
        res.status(404).json({error: 'Usuario no encontrado'});
      }
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
      user.profilePic = profilePic || user.password;
      user.role = role || user.role;

      await user.save();
      res.status(200).json(user);
    }catch(err){
      res.status(500).json({error: error.message});
    }
  }

  static async deleteOne (req, res) {
    try{
      const user = await User.findByIdAndDelete(req.params.id);
      if(!user){
        return res.status(404).json({error: 'Usuario no encontrado'});
      }
      res.status(200).json({message: 'Deleted user'});
    }catch(err){
      res.status(500).json({error: error.message});
    }
  }
}
