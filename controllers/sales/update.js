const updateService = require('../../services/sales/update');

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateSale = await updateService(req.body, id);
    res.status(200).json(updateSale);
  } catch (error) {
    next(error);
  }
};

module.exports = update;