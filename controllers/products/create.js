const serviceCreate = require('../../services/products/create');

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await serviceCreate.create(name, quantity);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = { create };
