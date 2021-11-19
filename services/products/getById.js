const modelGetById = require('../../models/products/getById');

const getById = async (id) => {
  const product = await modelGetById(id);
  if (!product) {
  return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
      },
    };
  }
  return product;
};

module.exports = getById;