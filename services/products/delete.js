const getByIdService = require('./getById');
const modelDelete = require('../../models/products/delete');

const deleteService = async (id) => {
  const verifyId = await getByIdService.getById(id);
  if (verifyId.code) throw verifyId;
  const { _id, name, quantity } = verifyId;
  await modelDelete.deleteModel(_id);
  const formatObject = {
    _id,
    name,
    quantity,
  };
  return formatObject;
};

module.exports = { deleteService };