const serviceCreate = require('../../services/sales/create');

const create = async (req, res, next) => {
  try {
    const newSale = await serviceCreate(req.body);
    res.status(200).json(newSale);
  } catch (error) {
    next(error);
  }
};

module.exports = create;