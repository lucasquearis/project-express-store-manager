const getByIdService = require('../../services/sales/getById');

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await getByIdService(id);
    res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;