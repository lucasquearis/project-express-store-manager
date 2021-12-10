const modelUpdate = require('../../models/products/update');
const updateHelper = require('./updateHelper');

const update = async (name, quantity, id) => {
  const error = updateHelper.isValidParams(name, quantity);
  if (error) throw error;
  const err = {
    code: 'invalid_data',
    message: '',
  };
  const verifyName = await updateHelper.isValidName(name);
  if (verifyName) err.message = verifyName;
  if (err.message) throw err;
  const resultFormat = {
    _id: id,
    name,
    quantity,
  };
  const updateProduct = await modelUpdate.update(name, quantity, id);
  if (updateProduct) return resultFormat;
};

module.exports = { update };