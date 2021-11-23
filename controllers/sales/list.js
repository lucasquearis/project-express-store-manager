const listService = require('../../services/sales/list');

const list = async (_req, res, next) => {
  try {
    const response = await listService();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = list;