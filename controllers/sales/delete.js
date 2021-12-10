const serviceDelete = require('../../services/sales/delete');

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const verifySale = await serviceDelete.remove(id);
    res.status(200).json(verifySale);
  } catch (error) {
    next(error);
  }
};

module.exports = { remove };