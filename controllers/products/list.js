const serviceList = require('../../services/products/list');

const list = async (req, res) => {
  const products = await serviceList();
  res.status(200).json(products);
};

module.exports = list;