const Joi = require('joi');

const updateModel = require('../../models/sales/update');
const getByIdProductModel = require('../../models/products/getById');
const modelUpdateProduct = require('../../models/products/updateQuantity');

const ERROR_MESSAGE = 'Wrong product ID or invalid quantity';

const verifyQuantityProduct = async (productId, quantity) => {
  const quantityEstoque = await getByIdProductModel(productId);
  const resultQuantity = quantityEstoque.quantity - quantity;
  if (resultQuantity < 0) return null;
  await modelUpdateProduct(productId, resultQuantity);
  return { productId, quantity };
};

const validateParams = (body) => {
  const { error } = Joi.array().items(Joi.object({
    productId: Joi.string().required().min(24).rule({ message: ERROR_MESSAGE }),
    quantity: Joi.number().required().min(1).rule({ message: ERROR_MESSAGE })
    .messages({ 'number.base': ERROR_MESSAGE }),
  })).validate(body);
  return error;
};

const formatResult = async (param, id) => {
  const inputUpdateModel = param
    .map(async ({ productId, quantity }) => updateModel(productId, quantity, id));
  await Promise.all(inputUpdateModel);
  const formatObject = {
    _id: id,
    itensSold: param,
  };
  return formatObject;
};

const update = async (body, id) => {
  const errorParams = validateParams(body);
  if (errorParams) throw errorParams;
  const mapBody = body.map(async ({ productId, quantity }) => {
    const validQuantityProduct = await verifyQuantityProduct(productId, quantity);
    return validQuantityProduct;
  });
  const resolveMap = await Promise.all(mapBody);
  if (resolveMap.includes(null)) {
    return {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
        },
      };
  }
  return formatResult(resolveMap, id);
};

module.exports = update;