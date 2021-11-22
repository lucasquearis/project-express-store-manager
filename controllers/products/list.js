const serviceList = require('../../services/products/list');

const list = async (req, res, next) => {
  try {
    return res.status(200).json(await serviceList());
  } catch (error) {
    next(error);
  }
};

module.exports = list;