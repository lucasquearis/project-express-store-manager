const modelGetById = require('../../models/sales/getById');

const getById = async (id) => {
  const sale = await modelGetById(id);
  if (!sale) {
    const errorFormat = {
      code: 'not_found',
      message: 'Sale not found',
      };
    throw errorFormat;
  }
  return sale;
};

module.exports = getById;