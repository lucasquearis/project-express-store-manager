const serviceGetById = require('../../services/products/getById');

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await serviceGetById(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;