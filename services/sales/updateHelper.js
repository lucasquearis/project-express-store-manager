const Joi = require('joi');
const updateModel = require('../../models/sales/update');
const getByIdProductModel = require('../../models/products/getById');
const modelUpdateProduct = require('../../models/products/updateQuantity');

const ERROR_MESSAGE = 'Wrong product ID or invalid quantity';

const validateParams = (body) => {
  const { error } = Joi.array().items(Joi.object({
    productId: Joi.string().required().min(24).rule({ message: ERROR_MESSAGE }),
    quantity: Joi.number().required().min(1).rule({ message: ERROR_MESSAGE })
    .messages({ 'number.base': ERROR_MESSAGE }),
  })).validate(body);
  return error;
};

const verifyQuantityProduct = async (productId, quantity) => {
  const quantityEstoque = await getByIdProductModel.getById(productId);
  const resultQuantity = quantityEstoque.quantity - quantity;
  if (resultQuantity < 0) return null;
  await modelUpdateProduct.updateQuantity(productId, resultQuantity);
  return { productId, quantity };
};

const formatResult = async (param, id) => {
  const inputUpdateModel = param
    .map(async ({ productId, quantity }) => updateModel.update(productId, quantity, id));
  await Promise.all(inputUpdateModel);
  const formatObject = {
    _id: id,
    itensSold: param,
  };
  return formatObject;
};

module.exports = {
  validateParams,
  verifyQuantityProduct,
  formatResult,
};