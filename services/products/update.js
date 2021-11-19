const modelGetByName = require('../../models/products/getByName');
const modelUpdate = require('../../models/products/update');

const isValidName = async (name) => {
  const alreadyExists = await modelGetByName(name);
  if (alreadyExists) return 'Product already exists';
  return false;
};

const update = async (name, quantity, id) => {
  const err = {
    code: 'invalid_data',
    message: '',
  };
  if (await isValidName(name)) err.message = await isValidName(name);
  if (err.message) return err;
  return modelUpdate(name, quantity, id);
};

module.exports = update;