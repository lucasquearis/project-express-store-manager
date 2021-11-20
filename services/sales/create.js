const modelGetProductById = require('../../models/products/getById');
const modelCreate = require('../../models/sales/create');

const create = async (body) => {
  const exist = await body.map(async (obj) => {
    const productVerify = await modelGetProductById(obj.productId);
    return productVerify;
  });
  const promiseResolve = await Promise.all(exist);
  if (promiseResolve.includes(null)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
        },
      };
  }
  return modelCreate(body);
};

module.exports = create;