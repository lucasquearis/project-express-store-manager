const Joi = require('joi');

const serviceUpdate = require('../../services/products/update');
const serviceGetById = require('../../services/products/getById');

const update = async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).required(),
  }).validate(req.body);

  if (error) return next(error);

  const { name, quantity } = req.body;
  const { id } = req.params;

  const validateProduct = await serviceGetById(id);
  const updateProduct = await serviceUpdate(name, quantity, id);

  if ('err' in validateProduct) return next(validateProduct.err);
  if ('code' in updateProduct) return next(updateProduct);
  
  res.status(200).json(updateProduct);
};

module.exports = update;