const Joi = require('joi');
const serviceCreate = require('../../services/products/create');

const create = async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().required().min(5),
    quantity: Joi.number().required().min(1),
  }).validate(req.body);
  if (error) return next(error);
  const { name, quantity } = req.body;
  const newProduct = await serviceCreate(name, quantity);
  if (newProduct.code) return next(newProduct);
  res.status(201).json(newProduct);
};

module.exports = create;
