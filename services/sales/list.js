const modelList = require('../../models/sales/list');

const list = async () => {
  const result = await modelList.list();
  const resultFormat = {
    sales: [
      ...result,
    ],
  };
  return resultFormat;
};

module.exports = { list };