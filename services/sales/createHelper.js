const Joi = require('joi');
const modelUpdateProduct = require('../../models/products/updateQuantity');

const ERROR_MESSAGE = 'Wrong product ID or invalid quantity';

const updateQuantityProduct = async (quantityVendido, quantityEstoque) => {
  const result = quantityEstoque.quantity - quantityVendido.quantity;
  if (result < 0) return null;
  await modelUpdateProduct.updateQuantity(quantityVendido.productId, result);
};

const validateParams = (body) => {
  const { error } = Joi.array().items(Joi.object({
    productId: Joi.string().required().min(24).rule({ message: ERROR_MESSAGE }),
    quantity: Joi.number().required().min(1).rule({ message: ERROR_MESSAGE })
    .messages({ 'number.base': ERROR_MESSAGE }),
  })).validate(body);
  return error;
};

module.exports = {
  updateQuantityProduct,
  validateParams,
};
