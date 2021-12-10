const modelList = require('../../models/products/list');

const list = async () => {
  const products = await modelList.list();
  return { products };
};

module.exports = { list };