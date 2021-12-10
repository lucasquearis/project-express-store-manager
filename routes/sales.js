const express = require('express');
const createController = require('../controllers/sales/create');
const listController = require('../controllers/sales/list');
const getByIdController = require('../controllers/sales/getById');
const updateController = require('../controllers/sales/update');
const deleteController = require('../controllers/sales/delete');

const salesRouter = express.Router({ mergeParams: true });

salesRouter.post('/', createController.create);
salesRouter.get('/', listController.list);
salesRouter.get('/:id', getByIdController.getById);
salesRouter.put('/:id', updateController.update);
salesRouter.delete('/:id', deleteController.remove);

module.exports = { salesRouter };