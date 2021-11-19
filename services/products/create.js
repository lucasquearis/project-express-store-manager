const modelCreate = require('../../models/products/create');
const modelGetByName = require('../../models/products/getByName');

const isValidName = async (name) => {
  const alreadyExists = await modelGetByName(name);
  if (alreadyExists) return 'Product already exists';
  return false;
};

const create = async (name, quantity) => {
  const err = {
      code: 'invalid_data',
      message: '',
  };
  if (await isValidName(name)) err.message = await isValidName(name);
  if (err.message) return err;
  return modelCreate(name, quantity);
};

module.exports = create;
