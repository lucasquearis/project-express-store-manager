const serviceDelete = require('../../services/products/delete');

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const verifyProduct = await serviceDelete(id);
  if ('err' in verifyProduct) return next(verifyProduct.err);
  res.status(200).json(verifyProduct);
};

module.exports = deleteProduct;