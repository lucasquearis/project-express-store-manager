const modelCreate = require('../../models/products/create');
const modelGetByName = require('../../models/products/getByName');

const isValidName = async (name) => {
  const alreadyExists = await modelGetByName(name);
  if (name.length < 5) return '"name" length must be at least 5 characters long';
  if (alreadyExists) return 'Product already exists';
  return false;
};

const isValidQuantity = (quantity) => {
  if (quantity <= 0) return '"quantity" must be larger than or equal to 1';
  if (typeof quantity !== 'number') return '"quantity" must be a number';
  return false;
};

const create = async (name, quantity) => {
  const err = {
      code: 'invalid_data',
      message: '',
  };
  if (await isValidName(name)) err.message = await isValidName(name);
  if (isValidQuantity(quantity)) err.message = isValidQuantity(quantity);
  if (err.message) return { err: { err } };
  return modelCreate(name, quantity);
};

module.exports = create;
