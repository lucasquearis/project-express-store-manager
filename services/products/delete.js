const getByIdService = require('./getById');
const modelDelete = require('../../models/products/delete');

const deleteService = async (id) => {
  const verifyId = await getByIdService(id);
  if (verifyId.err) return verifyId;
  return modelDelete(verifyId);
};

module.exports = deleteService;