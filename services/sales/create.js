const modelGetProductById = require('../../models/products/getById');
const modelCreate = require('../../models/sales/create');
const createHelper = require('./createHelper');

const create = async (body) => {
  const errorParams = createHelper.validateParams(body);
  if (errorParams) throw errorParams;
  const exist = await body.map(async (obj) => {
    const productVerify = await modelGetProductById.getById(obj.productId);
    if (productVerify.quantity < obj.quantity) return null;
    await createHelper.updateQuantityProduct(obj, productVerify);
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
  return modelCreate.create(body);
};

module.exports = { create };