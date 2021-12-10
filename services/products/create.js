const modelCreate = require('../../models/products/create');
const createHelper = require('./createHelper');

const create = async (name, quantity) => {
  const error = createHelper.isValidParams(name, quantity);
  if (error) throw error;
  const err = {
      code: 'invalid_data',
      message: '',
  };
  const alreadyExists = await createHelper.isValidName(name);
  if (alreadyExists) err.message = alreadyExists;
  if (err.message) throw err;
  return modelCreate.create(name, quantity);
};

module.exports = { create };
