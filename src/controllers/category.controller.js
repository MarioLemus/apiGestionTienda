import Category from "../models/category.model.js";

export class CategoryController {
  async get(req, res) {
    const { name, update_date, creation_date } = req.body;
    try {
      const category = await Category.find();
      res.status(200).json(category);
    } catch (error) {
      return res.status(400).json({ error: "Error al obtener las categorias" });
    }
  }

  async post(req, res) {
    const { name } = req.body;

    const cat = await Category.findOne({ name });
    if (cat) {
      return res.status(400).json({ error: "Error al obtener las categorias" });
    }
    try {
      const category = new Category({
        name: name,
        update_date: new Date(),
        creation_date: new Date(),
      });

      const savedata = category.save();
      res.status(200).json(category);
    } catch (error) {
      return res.status(400).json({ error: "Error al guardar la categoria" });
    }
  }

  async put(req, res) {
    const _id = req.params._id;
    const { name } = req.body;

    const cat = await Category.findOne({ _id });
    if (!cat) {
      return res.status(400).json({ error: "Error al obtener la categoria" });
    }
    try {
      cat.name = name;
      cat.update_date = new Date();
      await cat.save();
      res.status(200).json("Categoria actualizada");
    } catch (error) {
      return res.status(400).json({ error: "Error al guardar la categoria" });
    }
  }

  async delete(req, res) {
    const _id = req.params._id;

    const category = await Category.findByIdAndDelete({ _id });
    if (!category) {
      return res.status(400).json({ error: "No existe la categoria" });
    }
    res.status(200).json("Categoria eliminada con exito ");
  }

  async getbyame(req, res) {
    const { name } = req.params.name;
    const category = Category.findOne({ name });
    if (!category) {
      return res
        .status(400)
        .json({ error: `No se econtró la categoria ${name}` });
    }

    res.status(200).json(category);
  }
}
