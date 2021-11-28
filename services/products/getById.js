const modelGetById = require('../../models/products/getById');

const getById = async (id) => {
  const product = await modelGetById.getById(id);
  if (!product) {
    const error = {
      code: 'invalid_data',
      message: 'Wrong id format',
    }; 
    throw error;
  }
  return product;
};

module.exports = { getById };