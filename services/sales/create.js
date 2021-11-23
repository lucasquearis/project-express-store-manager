const Joi = require('joi');

const modelGetProductById = require('../../models/products/getById');
const modelCreate = require('../../models/sales/create');
const modelUpdateProduct = require('../../models/products/updateQuantity');

const ERROR_MESSAGE = 'Wrong product ID or invalid quantity';

const updateQuantityProduct = async (quantityVendido, quantityEstoque) => {
  const result = quantityEstoque.quantity - quantityVendido.quantity;
  if (result < 0) return null;
  await modelUpdateProduct(quantityVendido.productId, result);
};

const validateParams = (body) => {
  const { error } = Joi.array().items(Joi.object({
    productId: Joi.string().required().min(24).rule({ message: ERROR_MESSAGE }),
    quantity: Joi.number().required().min(1).rule({ message: ERROR_MESSAGE })
    .messages({ 'number.base': ERROR_MESSAGE }),
  })).validate(body);
  return error;
};

const create = async (body) => {
  const errorParams = validateParams(body);
  if (errorParams) throw errorParams;
  const exist = await body.map(async (obj) => {
    const productVerify = await modelGetProductById(obj.productId);
    if (productVerify.quantity < obj.quantity) return null;
    await updateQuantityProduct(obj, productVerify);
    return productVerify;
  });
  const promiseResolve = await Promise.all(exist);
  if (promiseResolve.includes(null)) {
    const errorFormat = {
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell',
    };
    throw errorFormat; 
  }
  return modelCreate(body);
};

module.exports = create;