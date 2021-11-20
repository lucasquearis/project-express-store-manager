const modelGetById = require('../../models/sales/getById');

const getById = async (id) => {
  const sale = await modelGetById(id);
  if (!sale) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
        },
      };
  }
  return sale;
};

module.exports = getById;