const getByIdService = require('../../services/sales/getById');

const getById = async (req, res, next) => {
  const { id } = req.params;
  const sale = await getByIdService(id);
  if ('err' in sale) return next(sale.err);
  res.status(200).json(sale);
};

module.exports = getById;