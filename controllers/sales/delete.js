const serviceDelete = require('../../services/sales/delete');

const remove = async (req, res, next) => {
  const { id } = req.params;
  const verifySale = await serviceDelete(id);
  if ('err' in verifySale) return next(verifySale.err);
  res.status(200).json(verifySale);
};

module.exports = remove;