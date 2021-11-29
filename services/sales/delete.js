const { ObjectId } = require('mongodb');
const modelDelete = require('../../models/sales/delete');
const deleteHelper = require('./deleteHelper');

const remove = async (id) => {
  if (!ObjectId.isValid(id)) {
    const errorFormat = {
        code: 'invalid_data', message: 'Wrong sale ID format',
      };
    throw errorFormat;
  }
  await deleteHelper.updateQuantity(id);
  const deleteModel = await modelDelete.remove(id);
  return deleteModel;
};

module.exports = { remove };