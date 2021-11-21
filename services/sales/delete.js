const modelDelete = require('../../models/sales/delete');

const remove = async (id) => {
  const deleteModel = await modelDelete(id);
  if (!deleteModel) return { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };
  return deleteModel;
};

module.exports = remove;