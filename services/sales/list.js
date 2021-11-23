const modelList = require('../../models/sales/list');

const list = async () => {
  const result = await modelList();
  const resultFormat = {
    sales: [
      ...result,
    ],
  };
  return resultFormat;
};

module.exports = list;