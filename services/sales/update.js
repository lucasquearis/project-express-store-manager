const updateModel = require('../../models/sales/update');
const getByIdProductModel = require('../../models/products/getById');
const modelUpdateProduct = require('../../models/products/updateQuantity');

const verifyQuantityProduct = async (productId, quantity) => {
  const quantityEstoque = await getByIdProductModel(productId);
  const resultQuantity = quantityEstoque.quantity - quantity;
  if (resultQuantity < 0) return false;
  await modelUpdateProduct(productId, resultQuantity);
  return true;
};

const update = async (productId, quantity, id) => {
  const validQuantityProduct = await verifyQuantityProduct(productId, quantity);
  if (!validQuantityProduct) {
    return {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
        },
      };
  }
    return updateModel(productId, quantity, id);
};

module.exports = update;