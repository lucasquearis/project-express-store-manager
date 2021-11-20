const serviceGetById = require('../../services/products/getById');

const getById = async (req, res, next) => {
  const { id } = req.params;
  const product = await serviceGetById(id);
  if ('err' in product) return next(product.err);
  res.status(200).json(product);
};

module.exports = getById;