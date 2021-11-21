const express = require('express');
const createController = require('../controllers/sales/create');
const listController = require('../controllers/sales/list');
const getByIdController = require('../controllers/sales/getById');
const updateController = require('../controllers/sales/update');
const deleteController = require('../controllers/sales/delete');

const salesRouter = express.Router({ mergeParams: true });

salesRouter.post('/', createController);
salesRouter.get('/', listController);
salesRouter.get('/:id', getByIdController);
salesRouter.put('/:id', updateController);
salesRouter.delete('/:id', deleteController);

module.exports = salesRouter;