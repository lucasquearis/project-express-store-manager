const serviceList = require('../../services/products/list');

const list = async (_req, res, next) => {
  try {
    return res.status(200).json(await serviceList.list());
  } catch (error) {
    next(error);
  }
};

module.exports = { list };