const { ObjectId } = require('mongodb');
const modelDelete = require('../../models/sales/delete');
const getSalesById = require('../../models/sales/getById');
const getProductById = require('../../models/products/getById');
const update = require('../../models/products/updateQuantity');

const updateQuantity = async (id) => {
  const sale = await getSalesById.getById(id);
  if (sale.itensSold) {
  const promiseSales = sale.itensSold.map(async (obj) => {
    const productQuantity = await getProductById.getById(obj.productId);
    const result = {
      id: obj.productId,
      oldQuantity: productQuantity,
      quantitySale: obj.quantity,
    };
    return result;
  });
  const promiseResolve = await Promise.all(promiseSales);
  const resolveMap = promiseResolve
    .map(async (obj) => {
      await update.updateQuantity(obj.id, obj.oldQuantity.quantity + obj.quantitySale);
    });
    await Promise.all(resolveMap);
  }
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) {
    const errorFormat = {
        code: 'invalid_data', message: 'Wrong sale ID format',
      };
    throw errorFormat;
  }
  await updateQuantity(id);
  const deleteModel = await modelDelete.remove(id);
  return deleteModel;
};

module.exports = { remove };