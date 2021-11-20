const serviceList = require('../../services/products/list');

const list = async (req, res) => res.status(200).json(await serviceList());

module.exports = list;