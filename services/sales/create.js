const modelGetProductById = require('../../models/products/getById');
const modelCreate = require('../../models/sales/create');
const modelUpdateProduct = require('../../models/products/updateQuantity');

const updateQuantityProduct = async (quantityVendido, quantityEstoque) => {
  const result = quantityEstoque.quantity - quantityVendido.quantity;
  if (result < 1) return null;
  await modelUpdateProduct(quantityVendido.productId, result);
};

const create = async (body) => {
  const exist = await body.map(async (obj) => {
    const productVerify = await modelGetProductById(obj.productId);
    if (productVerify.quantity < obj.quantity) return null;
    await updateQuantityProduct(obj, productVerify);
    return productVerify;
  });
  const promiseResolve = await Promise.all(exist);
  console.log('quanto quero adicionar', body);
  if (promiseResolve.includes(null)) {
    return {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
        },
      };
  }
  return modelCreate(body);
};

module.exports = create;