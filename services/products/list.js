const modelList = require('../../models/products/list');

const list = async () => modelList.list();

module.exports = { list };