const listService = require('../../services/sales/list');

const list = async (_req, res) => res.status(200).json(await listService());

module.exports = list;