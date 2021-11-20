const updateModel = require('../../models/sales/update');

const update = async (productId, quantity, id) => updateModel(productId, quantity, id);

module.exports = update;